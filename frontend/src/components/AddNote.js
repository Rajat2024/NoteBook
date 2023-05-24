import React, { useContext, useState, useEffect } from 'react';
import NoteContext from '../context/notes/noteContext';
import { useNavigate,Link,useLocation } from 'react-router-dom';

function AddNote(props) 
{
    const location = useLocation();
    const context = useContext(NoteContext);
    const {addNote, getNote} = context;

    const [note, setnote] = useState({ title: "", description: "", tag: "Todo", image: ""})

    function convertToBase64(e) {
       var reader = new FileReader();
       reader.readAsDataURL(e.target.files[0]);
       reader.onload = () => {
           console.log(reader.result);
           setnote({image: reader.result});
        //    note.image = reader.result;
       };
       reader.onerror = error => {
           console.log("Error: ", error);
       };
    }

    const navigate = useNavigate();
    
    const onchange=(e)=>{
        setnote({ ...note, [e.target.name]:e.target.value})
       
    }
    
    const handleClick=(e)=>{
        e.preventDefault(); 
        addNote(note.title, note.description, note.tag, note.image)
        setnote({  title: "", description: "", tag: "", image: ""})
        props.showAlert("Note added successfully", "success")
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNote()
        } else {
            navigate('/login')

        }
        // eslint-disable-next-line

    }, [])

    return (
        <div>
            <div className='my-4'>
                <div className="text-center">
                    <h3>✍🏻 Add A New Note:</h3>
                </div>
                <div className="mb-3 my-4">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <select className="form-select" aria-label="Default select example" id="tag" value={note.tag} onChange={onchange}  name="tag">

                        <option value="Todo">Todo</option>
                        <option value="Important">Important</option>
                        <option value="Academic">Academic</option>
                        <option value="Personal">Personal</option>
                        <option value="Others">Others</option>
                    </select>
                </div>
                <div className="mb-3 ">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title"  value={note.title} onChange={onchange} name="title" />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" name="description"  value={note.description} onChange={onchange} rows="3"></textarea>
                </div>
                <div>
                    <input accept="image/*" type="file" onChange={convertToBase64} />
                </div>
                <div className='text-center'>
                    <button className='btn btn-primary' onClick={handleClick}>Add Note</button>
                </div>

             
            </div>
            
            <div className="text-center">
            <Link to="/notes" className={`nav-link ${location.pathname === "/notes" ? "active" : ""}`} aria-current="page" >Your Notes</Link>
             </div>
        </div>
    )
}

export default AddNote
