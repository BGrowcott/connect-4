import { useEffect, useState } from "react";
import Loading from "../components/utils/loading";
import fetchWithJWT from "../utils/fetchWithJWT";

const Example = () => {
    const emptyForm = { name: "", age: "" };
    const [formState, setFormState] = useState(emptyForm);
    const [exampleData, setExampleData] = useState();

    useEffect(() => {
        apiTest();
    }, []);

    async function apiTest() {
        const response = await fetchWithJWT("/api/examples");
        const data = await response.json();
        setExampleData(data);
    }

    async function createUser(event) {
        event.preventDefault();
        const response = await fetchWithJWT("/api/examples", {
            method: "POST",
            body: JSON.stringify(formState),
        });
        const data = await response.json();
        setExampleData([...exampleData, data]);
        setFormState(emptyForm);
    }

    function handleFormInput(event) {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    }

    // don't make your components/pages like this, this is just to show the api working
    return (
        <section>
            {exampleData ? (
                <>
                    <h2>This is an example page</h2>
                    <div className="row">
                        <div className="col-6">
                            <h3>Current Examples:</h3>
                            <div className="row g-2">
                                {exampleData?.map((example) => {
                                    return (
                                        <div
                                            key={example._id}
                                            className="col-6"
                                        >
                                            <div className="bg-light p-1 rounded border">
                                                <div>{example.name}</div>
                                                <div>{example.age}</div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="col-6">
                            <h3>Create Example:</h3>
                            <form className="form" onSubmit={createUser}>
                                <label
                                    htmlFor="nameInput"
                                    className="form-label"
                                >
                                    Name
                                </label>
                                <input
                                    id="nameInput"
                                    name="name"
                                    className="form-control"
                                    onChange={handleFormInput}
                                    value={formState ? formState.name : ""}
                                ></input>

                                <label
                                    htmlFor="ageInput"
                                    className="form-label"
                                >
                                    Age
                                </label>
                                <input
                                    id="ageInput"
                                    name="age"
                                    className="form-control"
                                    onChange={handleFormInput}
                                    value={formState ? formState.age : ""}
                                ></input>

                                <button
                                    type="submit"
                                    className="my-2 btn btn-primary"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </>
            ) : (
                <Loading />
            )}
        </section>
    );
};

export default Example;
