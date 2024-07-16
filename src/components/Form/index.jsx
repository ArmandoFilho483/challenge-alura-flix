import styled from "styled-components"
import FormInput from "./FormInput"
import FormSelect from "./FormSelect"
import FormTextArea from "./FormTextArea"
import { useVideosContext } from "../../context/Videos"
import { useEffect, useState } from "react"

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 40px;
    width: 100%;
    max-width:575px;
    margin: 0 auto;
`

const StyledButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    max-width: 525px;
    @media screen and (min-width: 1024px){
        flex-direction: row;
        justify-content: space-between;
    }
`

const StyledFormButton = styled.button`
    width: 180px;
    height: 54px;
    background-color: transparent;
    font-size: 1.25rem;
    font-weight: 900;
    color:#FFFFFF;
    border: 3px solid #2271D1;
    border-radius: 15px;
    &.white{
        border: 3px solid #FFFFFF;
    }
`

const Form = ({method, video}) =>{
    const videoContext = useVideosContext()
    const [videoTitle, setVideoTitle] = useState('')
    const [videoSystem, setVideoSystem] = useState('')
    const [videoCover, setVideoCover] = useState('')
    const [videoVideo, setVideoVideo] = useState('')
    const [videoDescription, setVideoDescription] = useState('')

    useEffect(() =>{
        if(video){
            setVideoTitle(video.title)
            setVideoSystem(video.system)
            setVideoCover(video.cover)
            setVideoVideo(video.link)
            setVideoDescription(video.description)
        }
    },([]))

    function formSubmit(event){
        event.preventDefault()
        videoContext.editCard(null)
        const newVideo = {
            "title":videoTitle,
            "cover":videoCover,
            "link":videoVideo,
            "system":videoSystem,
            "description":videoDescription
        }
        
        if (video){
            newVideo.id = video.id
            videoContext.updateVideo(newVideo)
        }else{
            videoContext.addVideo(newVideo)

        }
        clearFields()
    }

    function clearFields(){
        setVideoTitle("")
        setVideoSystem("")
        setVideoCover("")
        setVideoVideo("")
        setVideoDescription("")
    }

    return(
        <StyledForm onSubmit={(event)=>formSubmit(event)}>
            <FormInput 
                color={method ? '#6BD1FF' : '#696969'}
                label="Título"
                id="title"
                type="text"
                value={videoTitle ? videoTitle : ""}
                placeholder="Insira o Titulo do video"
                handleChange={(value) => setVideoTitle(value)}
            />
            <FormSelect 
                color={method ? '#6BD1FF' : '#696969'}
                label="Sistema"
                id="system"
                categories={videoContext.categories}
                value={videoSystem ? videoSystem : ""}
                handleChange={(value) => setVideoSystem(value)}
            />
            <FormInput
                color={method ? '#6BD1FF' : '#696969'}
                label="Capa"
                id="cover"
                type="url src"
                value={videoCover ? videoCover : ""}
                placeholder="Insira o link da imagem."
                handleChange={(value) => setVideoCover(value)}
            />
            <FormInput 
                color={method ? '#6BD1FF' : '#696969'}
                label="Vídeo"
                id="video"
                type="url src"
                value={videoVideo ? videoVideo : ""}
                placeholder="Insira o link do video"
                handleChange={(value) => setVideoVideo(value)}
            />
            <FormTextArea  
                color={method ? '#6BD1FF' : '#696969'}
                label="Descrição"
                id="description"
                value={videoDescription ? videoDescription : ""}
                placeholder="Insira a descrição do video"
                handleChange={(value) => setVideoDescription(value)}
            />
            <StyledButtonContainer>
                <StyledFormButton type="submit">
                    Gravar
                </StyledFormButton>
                <StyledFormButton className="white" type="reset" onClick={()=>clearFields()}>
                    Limpar
                </StyledFormButton>
            </StyledButtonContainer>
        </StyledForm>
    )
}

export default Form