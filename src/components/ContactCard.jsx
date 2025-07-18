import { FaEdit, FaTrash } from "react-icons/fa";

export const ContactCard = ({ contact, onEdit, onDelete }) => {
    return (
        <div className="card mb-3" style={{ maxWidth: "540px" }}>
            <div className="row g-0">
                <div className="col-md-4 d-flex align-items-center justify-content-center">
                    <img
                        src={`https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`}
                        className="rounded-circle"
                        alt="Avatar"
                        width="100"
                        height="100"
                    />
                </div>
                <div className="col-md-8">
                    <div className="card-body text-start">
                        <h5 className="card-title">{contact.name}</h5>
                        <p className="card-text mb-1"><strong>Email:</strong> {contact.email}</p>
                        <p className="card-text mb-1"><strong>Phone:</strong> {contact.phone}</p>
                        <p className="card-text mb-1"><strong>Address:</strong> {contact.address}</p>
                        <div className="mt-2">
                            <button className="btn btn-sm btn-outline-primary me-2" onClick={() => onEdit(contact.id)}>
                                <FaEdit /> Edit
                            </button>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(contact.id)}>
                                <FaTrash /> Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};