import React from 'react'

const ResumeSection = ({
    heading,
    subsections,
    subsectionImage
}) => {

    return (
        <div className="resume-section-container">
            <h2 className="resume-section-heading">{heading}</h2>
            {subsections.map((subsection, index) => {
                const { title, duration, subtitle, description } = subsection;
                const formattedDuration = duration.trim() === "-" ? " " : duration;
                const descriptionItems = description ? description.split('\n').map((line, idx) => <li key={idx}>{line}</li>) : null;

                return (
                    <div key={`${subtitle}-${index}`} className="resume-subsection">
                        <img className="resume-subsection-image" src={subsectionImage} alt={title} />
                        <div className="resume-subsection-details">
                            <div className="resume-subsection-header">
                                <h3 className="resume-subsection-title">{title}</h3>
                                <p className="resume-subsection-duration">{formattedDuration}</p>
                            </div>
                            <p className="resume-subsection-subtitle">{subtitle}</p>
                            {description && <ul className="resume-subsection-description">{descriptionItems}</ul>}
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default ResumeSection