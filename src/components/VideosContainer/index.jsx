import styled from "styled-components"
import { useVideosContext } from "../../context/Videos"
import CategoryContainer from "../CategoryContainer"


const StyledVideosContainer = styled.main`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    margin: 40px 0;
    padding: 0 10px;
`

const VideosContainer = () =>{
    const categories = useVideosContext().categories
    const videos = useVideosContext().videos

    if (videos.length === 0 || categories.length === 0) {
        return null; 
    }

    return(
        <StyledVideosContainer>
            {categories.map((category) => (
                <CategoryContainer 
                    key={category.system} 
                    categories={category} 
                    videos={videos.filter((video) => video.system === category.system)}
                />)
            )}
        </StyledVideosContainer>
    )
}

export default VideosContainer