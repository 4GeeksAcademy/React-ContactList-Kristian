export const initialStore = () => {
  return {
    isAgendaCreated: false,
    agendaSlug: "",
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ]
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'add_task':

      const { id, color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };

    case 'set_agenda_created':
      return {
        ...store,
        isAgendaCreated: action.payload
      };

    case "set_agenda_slug":
      return {
        ...store,
        agendaSlug: action.payload
      };
    default:
      throw Error('Unknown action.');
  }
}
