import React, { useState, useEffect } from 'react';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {

    // State management
    const [list, setList] = useState([]);

    // Fetch data from strapi server
    const fetchRecruiters = async (e) => {
        setTimeout(async () => {
            const currentInput = e.target.value;
            console.log({currentInput});
    
            // Do not execute the query if the input has less than 4 characters
            if (currentInput.length < 4) return;
    
            const response = await fetch(`http://localhost:1337/recruiters?_where[name_contains]=${currentInput}`);
            const list = await response.json();
            setList(list);
    
            // Render input with new datalist
            renderList(list);
        });
    };

    // useEffect(() => {
    //     fetchRecruiters();
    // }, [])
        
    const renderList = (list) => {
        const recruitersList = document.querySelector('#recruiters-list');
        deleteChildElements();
        list.forEach(recruiter => {
            const dataOption = document.createElement('option');
            dataOption.value = recruiter.name;
            recruitersList.append(dataOption);
        });
    };

    const deleteChildElements = () => {
        const recruitersList = document.querySelector('#recruiters-list');
        recruitersList.innerHTML = ''; // Delete all child elements
    }

    return (
        <>
            <h2>Autocomplete</h2>
            {/* { list.length > 0 &&
                <> */}
                    <input
                        // onFocus={fetchRecruiters}
                        onKeyDown={fetchRecruiters}
                        onBlur={deleteChildElements}
                        list="recruiters-list"
                        type="text"
                    />
                        <datalist id="recruiters-list">
                        </datalist>
                {/* </>
            } */}
        </>
    )
}