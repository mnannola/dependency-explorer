import { json } from '@remix-run/node';
import { Form, useActionData } from "@remix-run/react";

export async function action({ request }) {
    const body = await request.formData();
    const packageDataString = body.get("packageData");
    if (!packageDataString) {
        return null;
    }

    const packageData = JSON.parse(packageDataString);
    // Pull dependencies out of packageData
    const { dependencies } = packageData;
    if (!dependencies) {
        return null;
    }

    // Loop through each dependency and call NPM on each one
    // https://registry.npmjs.org/{packageName}

    const fetches = Object.keys(dependencies).map(dependency => fetch(`https://registry.npmjs.org/${dependency}`));
    const res = await Promise.all(fetches);
    const data = await Promise.all(res.map(item => item.json()));

    // return array of responses
    return json(data);
  }
  

export default function Start() {
    const data = useActionData();
    console.log(data);
    return (
        <>
            <Form method="post">
                <div>
                    <p>Copy and paste package.json below</p>
                </div>
                <div>
                    <textarea id="packageData" name="packageData" rows="20" cols="30"></textarea>
                </div>                
                <button>Go</button>
            </Form>
            <div>
                <table>
                    <tr>
                        <th>Package Name</th>
                        <th>Latest Version</th>
                        <th>Version Release Date</th>
                    </tr>
                    {data ? data.map(pkg => (
                        <tr key={pkg._id}>
                            <td>{pkg.name}</td>
                            <td>{pkg['dist-tags'].latest}</td>
                            <td>{pkg.time[pkg['dist-tags']['latest']]}</td>
                        </tr>
                    )) : null}
                </table>
            </div>
        
        </>        
    );
}