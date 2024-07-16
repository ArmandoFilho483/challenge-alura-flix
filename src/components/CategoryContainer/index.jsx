import styled from "styled-components"
import VideoCard from "../VideoCard"
import CategoryTitle from "../CategoryTitle"


const StyledVideoCardContainer = styled.div`
    width: 100%;
    margin-bottom: 60px;
    display: flex;
    gap: 20px;
    overflow-y: auto;
    overflow-x: auto;
    scrollbar-width:thin;
    scrollbar-color: #2271D1 #2271D12B;
    &::-webkit-scrollbar{
        height: 10px;
    }
    &::-webkit-scrollbar{
        background-color: #2271D12B;
        border: 5px;
        border-radius: 20px;
    }
    &::-webkit-scrollbar-thumb{
        background-color: #2271D1;
        border-radius: 20px;
    }
`

const CategoryContainer = ({categories, videos}) =>{
    const hasVideos = videos.length > 0
    return(
        hasVideos 
            &&<>
                <CategoryTitle color={categories.color} >
                    {categories.system}
                </CategoryTitle>
                <StyledVideoCardContainer>
                    {videos.map((video) => <VideoCard key={video.title} color={categories.color} video={video} />)}
                </StyledVideoCardContainer>
            </> 
    )
}

export default CategoryContainer