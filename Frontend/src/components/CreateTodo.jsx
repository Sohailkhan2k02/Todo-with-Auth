export function CreateTodo(){
    return <div>
        <div>
        <input style={{
            padding:10,
            margin:10
            }} type="text" placeholder="title"></input>
        </div>
        <div><input style={{
            padding:10,
            margin:10
            }} type="text" placeholder="description"></input>
            </div>
            <div>
            <button>Add a todo</button>
            </div>
    </div>
}