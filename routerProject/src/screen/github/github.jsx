import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
const GitHub = ()=>{
    const [followers, setFollowers] = useState(0)
    const [profilePic, setProfilePic] = useState("https://avatars.githubusercontent.com/u/174812595?v=4")
    const { username } = useParams();
    // Loader is also used there by hook --> useLoaderData
    useEffect(()=>{
        async function fetchData() {
            try {
                const response = await fetch(`https://api.github.com/users/${username}`)
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const result = await response.json();
                setFollowers(result["followers"])
                setProfilePic(result["avatar_url"])
            } catch (error) {
                throw new Error("Failed to fetch data");
            }
        }
        if(username){
            fetchData()
        }
    }, [username]);

    return (
        <div className="github mx-auto w-full max-w-7xl">
            <Header />
            <div className="followers ">
                <p className="flex items-center justify-center h-15 bg-red-700 text-white font-bold">Followers: {followers}</p>
            </div>
            <div className="profile-pic flex items-center justify-center py-10">
                <img src={profilePic} alt="profile-pic" />
            </div>
            <Footer />
        </div>
    )
}

export default GitHub