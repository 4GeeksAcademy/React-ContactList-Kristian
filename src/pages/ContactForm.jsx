import useGlobalReducer from "../hooks/useGlobalReducer";

export const ContactForm = () => {
    const { store } = useGlobalReducer();
    const agendaSlug = store.agendaSlug; 

    const handleSubmit = (e) => {
        e.preventDefault();

        const contactData = {
            name: fullName,
            email,
            phone,
            address
        };

        fetch(`https://playground.4geeks.com/contact/agendas/${agendaSlug}/contacts`, {
            method: "POST",
            body: JSON.stringify(contactData),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                if (res.ok) {
                    alert("Contact created!");
                    navigate("/");
                } else {
                    alert("Something went wrong.");
                }
            })
            .catch(err => console.error("Error saving contact", err));
    };

    return (
        <div className="d-flex justify-content-center">
            <div className="container card m-4">
                <form className="m-4">
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Full Name</label>
                        <input type="name" className="form-control" id="inputName" aria-describedby="nameHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Address</label>
                        <input type="text" className="form-control" id="inputAddress" aria-describedby="addressHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Phone</label>
                        <input type="text" className="form-control" id="inputPhone" aria-describedby="phoneHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" />
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}