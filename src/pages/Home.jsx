import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
	const navigate = useNavigate();

	const [list, setList] = useState([]);
	const [agenda, setAgenda] = useState("");
	const [isAgendaCreated, setIsAgendaCreated] = useState(false);
	const { store, dispatch } = useGlobalReducer()

	const handleCreateAgenda = () => {
		fetch(`https://playground.4geeks.com/contact/agendas/${agenda}`, {
			method: "POST",
			body: JSON.stringify([]),
			headers: { "Content-Type": "application/json" }
		})
			.then(res => {
				if (res.ok) {
					setIsAgendaCreated(true);
					getContacts();
				} else {
					alert("This agenda is already created");
					setIsAgendaCreated(true);
					getContacts();
				}
			})
			.catch(err => console.error("There was an error creating agenda:", err));
	};

	const handleDelete = (contactId) => {
		fetch(`https://playground.4geeks.com/contact/agendas/${agenda}/${contactId}`, {
			method: "DELETE"
		})
			.then(() => getContacts())
			.catch(err => console.error("There was an error deleting contact:", err));
	};

	const handleEdit = (contactId) => {
		navigate(`/contactform/${contactId}`)
	};

	const getContacts = () => {
		fetch(`https://playground.4geeks.com/contact/agendas/${agenda}/contacts`)
			.then(res => res.json())
			.then(data => {
				if (Array.isArray(data)) {
					setList(data);
				} else if (Array.isArray(data.contacts)) {
					setList(data.contacts);
				} else {
					console.error("Unexpected data structure:", data);
					setList([]);
				}
			})
			.catch(err => console.error("There was an error getting contacts:", err));
	};

	return (
		<div className="text-center mt-5">
			<h1>Contact List</h1>
		</div>
	);
}; 