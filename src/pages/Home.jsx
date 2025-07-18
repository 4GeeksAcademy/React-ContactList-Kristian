import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
	const navigate = useNavigate();

	const [list, setList] = useState([]);
	const [agenda, setAgenda] = useState("");
	const { store, dispatch } = useGlobalReducer()

	const handleCreateAgenda = () => {
		fetch(`https://playground.4geeks.com/contact/agendas/${agenda}`, {
			method: "POST",
			body: JSON.stringify([]),
			headers: { "Content-Type": "application/json" }
		})
			.then(res => {
				if (res.ok) {
					dispatch({ type: "set_agenda_created", payload: true });
					getContacts();
				} else {
					alert("This agenda is already created");
					dispatch({ type: "set_agenda_created", payload: true });
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
		<div className="container text-center mt-5">
			<h1>Contact List</h1>

			{!store.isAgendaCreated ? (
				<div className="mt-4">
					<h4>Enter your agenda name</h4>
					<div className="input-group mb-3 justify-content-center">
						<input
							type="text"
							className="form-control w-50"
							value={agenda}
							onChange={(e) => setAgenda(e.target.value)}
						/>
						<button className="btn btn-primary" onClick={handleCreateAgenda}>
							Continue
						</button>
					</div>
				</div>
			) : (
				<div className="mt-4">
					{list.length > 0 ? (
						list.map((contact) => (
							<ContactCard
								key={contact.id}
								contact={contact}
								onEdit={handleEdit}
								onDelete={handleDelete}
							/>
						))
					) : (
						<p className="text-muted">No contacts yet. Add your first one!</p>
					)}
				</div>
			)}
		</div>
	);
}; 