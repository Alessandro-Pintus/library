import React, {useState} from 'react';
import '../components.css';
import Modal from 'react-modal';
import {Link} from 'react-router-dom';
Modal.setAppElement('#root')



const Case = ({ title, image, authors, link}) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    
    return (
        <div className='Case'>
            <div>
                <Link to={{ pathname: "/"}}>
                    <img src={image} alt='image_book' onClick={() => setModalIsOpen(true)}/>
                </Link>
                
            </div>
            <div className='modalWindow'>
                    <Modal isOpen={modalIsOpen} style={{position: 'unset'}}>
                        <div className='modalContainer'>
                            <img className='imageBook' src={image} alt=''/>
                            <h4>Titolo:  {title}</h4>
                            <h4>Autore: {authors}</h4>
                            <div className='containerInfoBtn'>
                                <button className='infoBtn' onClick={() => window.open(link)}>Ulterori informazioni</button>
                            </div>
                        </div>
                        <button  className='closeBtn' onClick={() => setModalIsOpen(false)}>&#10007;</button>  
                        
                    
                    </Modal>
            </div>
        </div>    
    )
};

export default Case;