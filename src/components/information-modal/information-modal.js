/**
 * CLOSES THE INFORMATION MODAL
 */
const closeInformationModal = () => {
    const modal = document.querySelector("#informationModal");
    modal.style.display = 'none';
};

/**
 * DISPLAYS THE INFORMATION MODAL
 */
const showInformationModal = () => {
    const modal = document.querySelector("#informationModal");
    console.log('clicking');
    modal.style.display = 'block';
    
};