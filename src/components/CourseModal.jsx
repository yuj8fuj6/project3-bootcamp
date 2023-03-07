import "./courseModal.css";

export default function CourseModal({ courseData }) {
// can courseData be an empty array? if yes, you got a bug here trying to access course_indices of undefined
  let element = courseData[0].course_indices.map((index) => (
    <p className="modalInfoDetails">
      {index.index_code} - {index.type}
    </p>
  ));

  return (
    <>
      <div className="modalBody">
        <div className="">
          <div className="box">
            <h1 className="modalTitle">Course Title</h1>
            <div className="modalInfoBox">
              <p className="modalInfoDetails">{courseData[0].course_name}</p>
            </div>
          </div>
          <div className="box">
            <h1 className="modalTitle">Course Code</h1>
            <div className="modalInfoBox">
              <p className="modalInfoDetails">{courseData[0].course_code}</p>
            </div>
          </div>
          <div className="box">
            <h1 className="modalTitle">Academic Unit</h1>
            <div className="modalInfoBox">
              <p className="modalInfoDetails">{courseData[0].academic_unit}</p>
            </div>
          </div>
          <div className="box">
            <h1 className="modalTitle">School</h1>
            <div className="modalInfoBox">
              <p className="modalInfoDetails">{courseData[0].school}</p>
            </div>
          </div>
          <div className="box">
            <h1 className="modalTitle">Course Indices</h1>
            <div className="modalInfoBox">{element}</div>
          </div>
        </div>
      </div>
    </>
  );
}
