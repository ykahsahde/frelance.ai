import { useEffect } from 'react'
import { useState } from 'react'
import API from "../api";
import { Navigate } from 'react-router-dom';

function Dashboard() {
    const [user,setUser] = useState(null)
    const [projects,setProjects] = useState([]);
    const [dark, setDark] = useState(false);
    const [form,setForm] = useState({
        title:"",
        description:"",
        budget:""
    })
    const token = localStorage.getItem("token");
    // Get Profile

    useEffect(() => {
        const fetchProfile  = async () => {
            const token = localStorage.getItem("token");
            const res = await API.get( "/auth/profile",
                {headers:{
                    Authorization:`Bearer ${token}`
                }

                }
            );
            setUser(res.data);
            console.log(res.data)
        };
        fetchProfile();
        fetchProjects();
    },[]);
    // Get All Projects
    const  fetchProjects = async () => {
          const res = await API.get("/projects")
          setProjects(res.data)
    }
    // handle Input
    const handleChanges = (e) => {
        setForm({...form,[e.target.name]:e.target.value})
    };
    // create project
    const handleSubmit = async(e) => {
            e.preventDefault();
            await API.post("/projects",form,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            fetchProjects();
            setForm({title:"",description:"",budget:""})
            
    };
    // Delete Project
    const handleDelete = async(id) =>{
        await API.delete(`/projects/${id}`,{
            headers:{Authorization:`Bearer ${token}`}
        });
        fetchProjects();
    }
    console.log(user)
 return (
  <div className={dark ? "bg-gray-900 text-white" : "bg-gray-100"} >

    {/* TOP NAVBAR */}
      <div className="bg-black text-white p-4 flex justify-between items-center sticky top-0 z-50">
      <h1 className="text-xl font-bold">Freelancer</h1>

      <div className="flex gap-6 items-center">
        <span>Browse</span>
        <span>Manage</span>
        <span>Groups</span>
        {user?.role === "admin" && (
  <button
    onClick={() => Navigate("/admin")}
    className="bg-purple-600 text-white px-4 py-2 rounded"
  >
    Go To Admin Panel
  </button>
)}
        <button onClick={() => setDark(!dark)}>
          
  Toggle Theme
</button>

        {user && <span className="text-gray-300">@{user.name}</span>}
        <button
  onClick={() => {
    localStorage.removeItem("token");
    window.location.href = "/";
  }}
  className="bg-red-600 px-4 py-1 rounded"
>
  Logout
</button>
      </div>
    </div>

    {/* SECONDARY MENU */}
    <div className="bg-gray-800 text-white flex gap-6 p-3 text-sm">
      <span className="font-bold">Dashboard</span>
      <span>My Projects</span>
      <span>Services</span>
      <span>Inbox</span>
      
    </div>

    {/* MAIN SECTION */}
    <div className="flex flex-col lg:flex-row gap-6 p-6">

      {/* LEFT CONTENT */}
      <div className="w-full lg:w-2/3 space-y-6">

        {/* CREATE PROJECT CARD */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold mb-4">
            Create Project
          </h3>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChanges}
              className="w-full border p-3 rounded-lg"
            />

            <input
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChanges}
              className="w-full border p-3 rounded-lg"
            />

            <input
              name="budget"
              placeholder="Budget"
              value={form.budget}
              onChange={handleChanges}
              className="w-full border p-3 rounded-lg"
            />

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Create
            </button>
          </form>
        </div>

        {/* PROJECTS GRID */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            My Projects
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div
                key={project._id}
                className="bg-white shadow-lg rounded-2xl p-5 hover:shadow-2xl transition duration-300 transform hover:-translate-y-2"
              >
                <h4 className="text-xl font-bold mb-2 text-gray-800">
                  {project.title}
                </h4>

                <p className="text-gray-600 mb-3">
                  {project.description}
                </p>

                <p className="font-semibold text-green-600 mb-4">
                  ₹ {project.budget}
                </p>

                <button
                  onClick={() => handleDelete(project._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* RIGHT SIDEBAR */}
      <div className="w-full lg:w-1/3 space-y-6">

        {/* PROFILE CARD */}
        <div className="bg-white p-5 rounded-2xl shadow">
          <h3 className="font-semibold mb-2">
            Account Progress
          </h3>

          <div className="w-full bg-gray-200 h-2 rounded">
            <div className="bg-blue-600 h-2 rounded w-1/2"></div>
          </div>

          <p className="text-sm mt-2">
            55% Complete
          </p>
        </div>

        {/* BALANCE CARD */}
        <div className="bg-white p-5 rounded-2xl shadow">
          <h3 className="font-semibold">Balance</h3>
          <p className="text-lg mt-2">₹ 0.00 INR</p>
        </div>

      </div>

    </div>
  </div>
);
}

export default Dashboard
