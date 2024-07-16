import styled from "styled-components";
import { useVideosContext } from "../../context/Videos";
import CategoryTitle from "../CategoryTitle";
import { Link } from "react-router-dom";

const StyledBanner = styled.div`
    display: none;
    @media screen and (min-width: 1024px){ 
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 24px;
        width: 100%;
        height: 500px;
        margin: 20px 0;
        padding: 0 40px;
        background:linear-gradient(#0012338F,#0012338F),url(${(props) => props.$cover});
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        border: 4px solid #6BD1FF;
        cursor: pointer;
        div{
            display: flex;
            flex-direction: column;
            width: 100%;

        }
        h3{
            font-family: "Roboto", sans-serif;
            font-size: 3rem;
            margin: 20px 0;
        }
        p{
            font-family: "Roboto", sans-serif;
            font-size: 1.125rem;
            font-weight: 300;
            color: #F5F5F5;
            text-align: justify;
        }
        img{
            width: 100%;
            max-width: 500px;
            align-self: center;
        }
    }
`

const Banner = () =>{
    const videos = useVideosContext().videos
    const categories = useVideosContext().categories

    if (videos.length === 0 || categories.length === 0) {
        return null; 
    }

    const randomNumber = Math.floor(Math.random() * (videos.length))
    const bannerVideo = videos[randomNumber]
    const bannerVideoCategory = categories.filter((category) => category.system === bannerVideo.system)
    const categoryColor = bannerVideoCategory[0].color
    
    return(
        <Link to={`/${bannerVideo.id}`}>
            <StyledBanner $cover={bannerVideo.cover}>
                <div>
                        <CategoryTitle color={categoryColor}>{bannerVideo.system}</CategoryTitle>
                        <h3>{bannerVideo.title}</h3>
                        <p>{bannerVideo.description}</p>
                </div>
                <div>
                    <img src={bannerVideo.cover} alt={bannerVideo.title} />
                </div>
            </StyledBanner>
        </Link>
    )
}



export default Banner