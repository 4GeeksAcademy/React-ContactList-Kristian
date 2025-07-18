import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
	const { store } = useGlobalReducer();

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					{store.isAgendaCreated && (
						<Link to="/contactform">
							<button className="btn btn-success">Add Contact</button>
						</Link>
					)}
				</div>
			</div>
		</nav>
	);
};