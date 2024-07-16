import Banner from "../../components/Banner"
import EditModal from "../../components/EditModal"
import VideosContainer from "../../components/VideosContainer"
import { useVideosContext } from "../../context/Videos"


const HomePage = () =>{
    const selectedVideo = useVideosContext().selectedVideo
    return(
        <>
            <Banner />
            <VideosContainer />  
            <EditModal selectedCard={selectedVideo} /> 
        </>
    )
}

export default HomePage