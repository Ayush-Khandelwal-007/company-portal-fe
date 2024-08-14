import React from 'react'

const ResumeSection = ({
    heading,
    subsections,
    subsectionImage
}) => {

    return (
        <div className="resume-section-container">
            <h2 className="resume-section-heading">{heading}</h2>
            {subsections.map((subsection, index) => (
                <div key={`${subsection.subtitle}-${index}`} className="resume-subsection">
                    <img className="resume-subsection-image" src={subsectionImage} alt={subsection.title} />
                    <div className="resume-subsection-details">
                        <div className="resume-subsection-header">
                            <h3 className="resume-subsection-title">{subsection.title}</h3>
                            <p className="resume-subsection-duration">{subsection.duration.trim()==="-" ? " " : subsection.duration}</p>
                        </div>
                        <p className="resume-subsection-subtitle">{subsection.subtitle}</p>
                        {subsection.description&&<ol className="resume-subsection-description">
                            {subsection.description.split('\n').map((line) => <li>{line}</li>)}
                        </ol>}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ResumeSection