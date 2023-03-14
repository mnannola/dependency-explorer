import { json } from '@remix-run/node';
import { Form, useActionData } from "@remix-run/react";
import fixtureData from '../../fixtureData';

export async function action({ request }) {
    /*
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
    console.log(data);
    */
    return json(fixtureData);
  }
  

export default function Start() {
    const data = useActionData();
    console.log(data);
    return (
        <div className="p-3">
            <Form method="post">
                <div>
                    <p>Copy and paste package.json below</p>
                </div>
                <div>
                    <textarea className='border-2 border-gray-500' id="packageData" name="packageData" rows="20" cols="30"></textarea>
                </div>                
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Go</button>
            </Form>
            {data &&
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th className="px-6 py-3">Package Name</th>
                                <th className="px-6 py-3">Latest Version</th>
                                <th className="px-6 py-3">Version Release Date</th>
                            </tr>
                        </thead>
                        
                        {data.map(pkg => (
                            <tr key={pkg._id}>
                                <td>{pkg.name}</td>
                                <td>{pkg['dist-tags'].latest}</td>
                                <td>{pkg.time[pkg['dist-tags']['latest']]}</td>
                            </tr>
                        ))}
                    </table>
                </div>
            }
        
        </div>        
    );
}