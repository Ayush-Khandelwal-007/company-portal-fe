import React, {useState} from 'react';
import { Row, Col, Pagination } from 'antd';
import ProfileCard from '../Components/ProfileCard';
import '../styles/explore.css'

const ShortListed = () => {
    const profiles = [
        {
            "userId": "02b5d3f7-6f08-11ee-8bff-42010a400007",
            "email": "barbaramoore55@mail.com",
            "name": "Mary Martin",
            "phone": "+1-971-236-6687",
            "residence": null,
            "profilePic": null,
            "fullTimeSalaryCurrency": "USD",
            "fullTimeSalary": "2613",
            "partTimeSalaryCurrency": "USD",
            "partTimeSalary": "1306.5",
            "createdAt": "2023-09-01T04:48:45.000Z",
            "lastLogin": "2023-11-24T13:34:30.000Z",
            "isGptEnabled": 0,
            "isActive": 0,
            "workAvailability": "immediately",
            "location": "{\"city\": \"Austin\", \"country\": \"USA\"}",
            "skills": "React, Next.js, JavaScript, HTML/CSS, Flutter",
            "totalExperience": 2
          },
          {
            "userId": "02cc92b0-6ea1-11ee-8bff-42010a400007",
            "email": "karendavis1@yahoo.com",
            "name": "Susan Taylor",
            "phone": "+1-313-956-7987",
            "residence": null,
            "profilePic": null,
            "fullTimeSalaryCurrency": "USD",
            "fullTimeSalary": "7203",
            "partTimeSalaryCurrency": "USD",
            "partTimeSalary": "3601.5",
            "createdAt": "2023-08-31T08:04:52.000Z",
            "lastLogin": "2023-11-22T22:16:41.000Z",
            "isGptEnabled": 0,
            "isActive": 0,
            "workAvailability": "oneMonth",
            "location": "{\"city\": \"Chicago\", \"country\": \"USA\"}",
            "skills": "Spring, SQL, React, JavaScript, Java",
            "totalExperience": 5
          },
          {
            "userId": "0309284f-13a7-4db8-91c4-3d44d20c40ad",
            "email": "charlesjones76@gmail.com",
            "name": "David Miller",
            "phone": "+1-468-942-1787",
            "residence": null,
            "profilePic": null,
            "fullTimeSalaryCurrency": "USD",
            "fullTimeSalary": "8229",
            "partTimeSalaryCurrency": "USD",
            "partTimeSalary": "4114.5",
            "createdAt": "2023-11-07T23:51:32.000Z",
            "lastLogin": "2023-11-09T10:15:57.000Z",
            "isGptEnabled": 0,
            "isActive": 0,
            "workAvailability": "immediately",
            "location": "{\"city\": \"San Jose\", \"country\": \"USA\"}",
            "skills": "Spring, SQL, JavaScript, Java, AWS",
            "totalExperience": 1
          },
          {
            "userId": "03231375-6ec4-11ee-8bff-42010a400007",
            "email": "barbaramoore17@outlook.com",
            "name": "David Moore",
            "phone": "+1-942-356-4837",
            "residence": null,
            "profilePic": null,
            "fullTimeSalaryCurrency": "USD",
            "fullTimeSalary": "4889",
            "partTimeSalaryCurrency": "USD",
            "partTimeSalary": "2444.5",
            "createdAt": "2023-07-28T23:15:34.000Z",
            "lastLogin": "2023-11-16T08:43:17.000Z",
            "isGptEnabled": 0,
            "isActive": 0,
            "workAvailability": "immediately",
            "location": "{\"city\": \"Seattle\", \"country\": \"USA\"}",
            "skills": "SQL, SQL, Python, Python, Java, Java, HTML/CSS, HTML/CSS, Django, Django",
            "totalExperience": 0
          },
          {
            "userId": "035f181a-6ea5-11ee-8bff-42010a400007",
            "email": "johnwilson25@outlook.com",
            "name": "Charles Brown",
            "phone": "+1-664-826-8490",
            "residence": null,
            "profilePic": null,
            "fullTimeSalaryCurrency": "USD",
            "fullTimeSalary": "5166",
            "partTimeSalaryCurrency": "USD",
            "partTimeSalary": "2583",
            "createdAt": "2023-06-28T10:26:44.000Z",
            "lastLogin": "2023-11-04T03:48:55.000Z",
            "isGptEnabled": 0,
            "isActive": 0,
            "workAvailability": "immediately",
            "location": "{\"city\": \"New York\", \"country\": \"USA\"}",
            "skills": "React Native, Kotlin, Java, GraphQL, Flutter",
            "totalExperience": 1
          },
          {
            "userId": "03b00dde-6f0c-11ee-8bff-42010a400007",
            "email": "patriciarodriguez89@mail.com",
            "name": "Jennifer Miller",
            "phone": "+1-502-697-8612",
            "residence": null,
            "profilePic": null,
            "fullTimeSalaryCurrency": "USD",
            "fullTimeSalary": "5159",
            "partTimeSalaryCurrency": "USD",
            "partTimeSalary": "2579.5",
            "createdAt": "2023-08-30T22:35:24.000Z",
            "lastLogin": "2023-11-16T23:11:12.000Z",
            "isGptEnabled": 0,
            "isActive": 0,
            "workAvailability": "oneMonth",
            "location": "{\"city\": \"Houston\", \"country\": \"USA\"}",
            "skills": "Python, Docker, Computer Vision, Web scraping, Speech generation",
            "totalExperience": 0
          },
          {
            "userId": "04309c17-6ebc-11ee-8bff-42010a400007",
            "email": "jessicajackson26@outlook.com",
            "name": "Robert Jackson",
            "phone": "+1-901-971-8393",
            "residence": null,
            "profilePic": null,
            "fullTimeSalaryCurrency": "USD",
            "fullTimeSalary": "3845",
            "partTimeSalaryCurrency": "USD",
            "partTimeSalary": "1922.5",
            "createdAt": "2023-08-19T06:32:10.000Z",
            "lastLogin": "2023-11-16T03:33:08.000Z",
            "isGptEnabled": 0,
            "isActive": 0,
            "workAvailability": "immediately",
            "location": "{\"city\": \"Phoenix\", \"country\": \"USA\"}",
            "skills": "TypeScript, Python, Next.js, Express.js, Web scraping",
            "totalExperience": 2
          },
          {
            "userId": "04d16f32-f707-43f8-8fcb-c038b3ec4386",
            "email": "michaelwilson71@mail.com",
            "name": "Linda Martinez",
            "phone": "+1-750-565-2873",
            "residence": null,
            "profilePic": null,
            "fullTimeSalaryCurrency": "USD",
            "fullTimeSalary": "8224",
            "partTimeSalaryCurrency": "USD",
            "partTimeSalary": "4112",
            "createdAt": "2023-11-14T14:41:32.000Z",
            "lastLogin": "2023-11-14T15:03:11.000Z",
            "isGptEnabled": 0,
            "isActive": 0,
            "workAvailability": "immediately",
            "location": "{\"city\": \"Denver\", \"country\": \"USA\"}",
            "skills": "Python, NLP, Large Language Models, Computer Vision, Web scraping",
            "totalExperience": 0
          },
          {
            "userId": "05ea70b3-6eb3-11ee-8bff-42010a400007",
            "email": "barbarataylor89@hotmail.com",
            "name": "Jessica Wilson",
            "phone": "+1-964-836-2855",
            "residence": null,
            "profilePic": null,
            "fullTimeSalaryCurrency": "USD",
            "fullTimeSalary": "6483",
            "partTimeSalaryCurrency": "USD",
            "partTimeSalary": "3241.5",
            "createdAt": "2023-08-31T14:45:33.000Z",
            "lastLogin": "2023-11-22T22:01:14.000Z",
            "isGptEnabled": 0,
            "isActive": 0,
            "workAvailability": "oneMonth",
            "location": "{\"city\": \"Jacksonville\", \"country\": \"USA\"}",
            "skills": "React, Next.js, JavaScript, Java, HTML/CSS",
            "totalExperience": 0
          },
          {
            "userId": "0619db42-6ea9-11ee-8bff-42010a400007",
            "email": "barbaraanderson4@gmail.com",
            "name": "Charles Jones",
            "phone": "+1-636-891-5788",
            "residence": null,
            "profilePic": null,
            "fullTimeSalaryCurrency": "USD",
            "fullTimeSalary": "1439",
            "partTimeSalaryCurrency": "USD",
            "partTimeSalary": "719.5",
            "createdAt": "2023-06-21T16:47:00.000Z",
            "lastLogin": "2023-11-19T22:25:08.000Z",
            "isGptEnabled": 0,
            "isActive": 0,
            "workAvailability": "immediately",
            "location": "{\"city\": \"Denver\", \"country\": \"USA\"}",
            "skills": "React, Node.js, Next.js, HTML/CSS, Express.js",
            "totalExperience": 4
          }
    ];
  
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8; // Number of cards per page
  
    const handleChange = page => {
      setCurrentPage(page);
    };
  
    return (
      <div className="explore-container">
        <Row gutter={[24, 24]} justify="center">
          {profiles.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((profile, index) => (
            <Col key={index} xs={24} sm={24} lg={12} xl={12}>
              <ProfileCard profile={profile} />
            </Col>
          ))}
        </Row>
        <Pagination
          current={currentPage}
          onChange={handleChange}
          total={profiles.length}
          pageSize={pageSize}
          showSizeChanger={false}
        />
      </div>
    );
  };
  
  export default ShortListed;