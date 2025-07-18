import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { ContactCard } from "../components/ContactCard";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const Home = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const [list, setList] = useState([]);
	const [agenda, setAgenda] = useState("");
	const { store, dispatch } = useGlobalReducer()
	const agendaSlug = store.agendaSlug;

	const handleCreateAgenda = async () => {
		if (!agenda.trim()) {
			alert("Please enter a valid agenda name.");
			return;
		}

		fetch(`https://playground.4geeks.com/contact/agendas/${agenda}`, {
			method: "POST",
			body: JSON.stringify([]),
			headers: { "Content-Type": "application/json" }
		})
			.then(res => {
				if (res.ok) {
					dispatch({ type: "set_agenda_created", payload: true });
					dispatch({ type: "set_agenda_slug", payload: agenda });
					getContacts(agenda);
				} else {
					alert("This agenda is already created");
					dispatch({ type: "set_agenda_created", payload: true });
					dispatch({ type: "set_agenda_slug", payload: agenda });
					getContacts(agenda);
				}
			})
			.catch(err => console.error("There was an error creating agenda:", err));
	};

	const handleDelete = (contactId) => {
		const confirmed = window.confirm("Are you sure?");
		if (!confirmed) return;

		fetch(`https://playground.4geeks.com/contact/agendas/${store.agendaSlug}/contacts/${contactId}`, {
			method: "DELETE"
		})
			.then(() => getContacts())
			.catch(err => console.error("There was an error deleting contact:", err));
	};

	const handleEdit = (contactId) => {
		const selectedContact = list.find(contact => contact.id === contactId);
		navigate(`/contactform/${contactId}`, { state: { contact: selectedContact } });
	};

	const getContacts = (slug = agendaSlug) => {
		fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts`)
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

	useEffect(() => {
		const fetchContacts = async () => {
			if (!agendaSlug) return;
			try {
				const res = await fetch(`https://playground.4geeks.com/contact/agendas/${agendaSlug}/contacts`);
				const data = await res.json();
				if (Array.isArray(data.contacts)) {
					setList(data.contacts);
				} else if (Array.isArray(data)) {
					setList(data);
				} else {
					console.error("Unexpected data structure:", data);
				}
			} catch (err) {
				console.error("Error fetching contacts", err);
			}
		};

		fetchContacts();
	}, [agendaSlug]);

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
				<div className="mt-4 d-flex justify-content-center">
					<div class="d-flex flex-column">
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
				</div>
			)}
		</div>
	);
}; 