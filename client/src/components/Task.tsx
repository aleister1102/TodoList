import Checkbox from "./Checkbox";

export interface TaskDetails {
    id: number;
    content: string;
    completed: boolean;
}

export default function Task({ id, content, completed }: TaskDetails) {
    return (
        <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-md mb-4">
            <div className="flex items-center">
                <Checkbox id={id} completed={completed} />
                <span className={completed ? 'line-through' : ''}>
                    <h3>Id: {id}</h3>
                    <p>Content: {content}</p>
                </span>
            </div>
        </div>
    );
}