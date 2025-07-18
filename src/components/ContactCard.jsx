import { FaEdit, FaTrash } from "react-icons/fa";

export const ContactCard = ({ contact, onEdit, onDelete }) => {
    return (
        <div className="card mb-3 position-relative" style={{ width: "700px" }}>
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
                        <p className="card-text mb-1"><span className="m-1"><i class="fa-solid fa-location-dot"></i></span> {contact.address}</p>
                        <p className="card-text mb-1"><span className="m-1"><i class="fa-solid fa-phone"></i></span> {contact.phone}</p>
                        <p className="card-text mb-1"><span className="m-1"><i class="fa-solid fa-envelope"></i></span> {contact.email}</p>
                        <div className="position-absolute top-0 end-0 p-2">
                            <button className="btn btn-sm edit-button me-1" onClick={() => onEdit(contact.id)}>
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button className="btn btn-sm del-button" onClick={() => onDelete(contact.id)}>
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};