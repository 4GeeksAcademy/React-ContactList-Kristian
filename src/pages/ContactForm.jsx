import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const ContactForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { contact } = location.state || {};
    const { contactId } = useParams();
    const { store } = useGlobalReducer();
    const agendaSlug = store.agendaSlug;

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    useEffect(() => {
        if (contact) {
            setFullName(contact.name);
            setEmail(contact.email);
            setPhone(contact.phone);
            setAddress(contact.address);
        }
    }, [contact]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!fullName || !email || !phone || !address) {
            alert("All fields are required.");
            return;
        }

        const contactData = {
            name: fullName,
            email,
            phone,
            address,
            agenda_slug: agendaSlug
        };

        const url = contactId
            ? `https://playground.4geeks.com/contact/agendas/${agendaSlug}/contacts/${contactId}`
            : `https://playground.4geeks.com/contact/agendas/${agendaSlug}/contacts`;

        const method = contactId ? "PUT" : "POST";

        console.log(contactData);
        console.log("Agenda slug:", agendaSlug);
        fetch(url, {
            method,
            body: JSON.stringify(contactData),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                if (res.ok) {
                    alert(contactId ? "Contact updated!" : "Contact created!");
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
                <form className="m-4" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="inputName" className="form-label">Full Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputName"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputAddress" className="form-label">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputAddress"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputPhone" className="form-label">Phone</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputPhone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputEmail" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="inputEmail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary">
                            {contactId ? "Update Contact" : "Create Contact"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};