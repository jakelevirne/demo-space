"use client"; // Required for useState and event handlers

import { useState } from 'react'; // Import useState

interface Card {
  id: string;
  title: string;
  description?: string;
}

interface Column {
  id: string;
  title: string;
  cards: Card[];
}

const initialBoardData: Column[] = [
  {
    id: 'todo',
    title: 'To Do',
    cards: [
      { id: 'task-1', title: 'Setup project repository', description: 'Initialize git and push to GitHub.' },
      { id: 'task-2', title: 'Define database schema', description: 'Plan out the tables and relationships for tasks and users.' },
      { id: 'task-3', title: 'Create initial UI mockups', description: 'Sketch basic layouts for the board and card views.' },
    ],
  },
  {
    id: 'inprogress',
    title: 'In Progress',
    cards: [
      { id: 'task-4', title: 'Develop API for tasks', description: 'Implement CRUD operations for tasks.' },
      { id: 'task-5', title: 'Build Kanban column component', description: 'Create a reusable React component for columns.' },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    cards: [
      { id: 'task-6', title: 'Choose a color scheme', description: 'Decide on primary and secondary colors for the app.' },
      { id: 'task-7', title: 'Setup linter and formatter', description: 'Configure ESLint and Prettier for consistent code style.' },
    ],
  },
];

export default function Home() {
  const [boardData, setBoardData] = useState<Column[]>(initialBoardData);
  const [editingCard, setEditingCard] = useState<{ columnId: string; cardId: string; title: string; description: string } | null>(null);

  const handleAddCard = (columnId: string) => {
    const title = prompt("Enter card title:");
    if (!title) return;
    const description = prompt("Enter card description (optional):") || "";

    const newCard: Card = {
      id: `task-${Date.now()}`, // Simple unique ID
      title,
      description,
    };

    setBoardData((prevBoardData) =>
      prevBoardData.map((column) =>
        column.id === columnId
          ? { ...column, cards: [...column.cards, newCard] }
          : column
      )
    );
  };

  const handleDeleteCard = (columnId: string, cardId: string) => {
    if (!confirm("Are you sure you want to delete this card?")) return;
    setBoardData((prevBoardData) =>
      prevBoardData.map((column) =>
        column.id === columnId
          ? { ...column, cards: column.cards.filter((card) => card.id !== cardId) }
          : column
      )
    );
    if (editingCard && editingCard.cardId === cardId) {
      setEditingCard(null); // Stop editing if the card is deleted
    }
  };

  const handleStartEditCard = (columnId: string, card: Card) => {
    setEditingCard({ columnId, cardId: card.id, title: card.title, description: card.description || '' });
  };

  const handleCancelEdit = () => {
    setEditingCard(null);
  };

  const handleSaveEdit = () => {
    if (!editingCard) return;

    setBoardData(prevBoardData =>
      prevBoardData.map(column =>
        column.id === editingCard.columnId
          ? {
              ...column,
              cards: column.cards.map(card =>
                card.id === editingCard.cardId
                  ? { ...card, title: editingCard.title, description: editingCard.description }
                  : card
              ),
            }
          : column
      )
    );
    setEditingCard(null);
  };

  const handleEditingCardChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editingCard) return;
    setEditingCard({ ...editingCard, [e.target.name]: e.target.value });
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">My Kanban Board</h1>
      </header>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 overflow-x-auto pb-4">
        {boardData.map((column) => (
          <div
            key={column.id}
            className="bg-gray-100 rounded-lg shadow p-3 sm:p-4 w-full sm:w-72 md:w-80 flex-shrink-0"
          >
            <h2 className="text-lg font-semibold text-gray-700 mb-3 sm:mb-4 px-1">
              {column.title}
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {column.cards.map((card) => (
                <div
                  key={card.id}
                  className="bg-white rounded-md p-3 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  {editingCard && editingCard.cardId === card.id ? (
                    <div className='space-y-2'>
                      <input
                        type="text"
                        name="title"
                        value={editingCard.title}
                        onChange={handleEditingCardChange}
                        className="w-full p-1 border border-gray-300 rounded text-sm"
                        placeholder="Card title"
                      />
                      <textarea
                        name="description"
                        value={editingCard.description}
                        onChange={handleEditingCardChange}
                        className="w-full p-1 border border-gray-300 rounded text-sm h-20"
                        placeholder="Card description"
                      />
                      <div className="flex justify-end gap-2 mt-2">
                        <button
                          onClick={handleSaveEdit}
                          className="text-xs bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="text-xs bg-gray-300 hover:bg-gray-400 text-gray-800 px-2 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3 className="font-medium text-gray-900 mb-1">{card.title}</h3>
                      {card.description && (
                        <p className="text-sm text-gray-600 mb-2">{card.description}</p>
                      )}
                      <div className="flex justify-end gap-2 mt-2">
                        <button
                          onClick={() => handleStartEditCard(column.id, card)}
                          className="text-xs text-blue-500 hover:text-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCard(column.id, card.id)}
                          className="text-xs text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
              {/* Placeholder for adding a new card */}
              <button
                onClick={() => handleAddCard(column.id)}
                className="w-full text-left text-sm text-gray-500 hover:bg-gray-200 p-2 rounded-md mt-2"
              >
                + Add card
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
