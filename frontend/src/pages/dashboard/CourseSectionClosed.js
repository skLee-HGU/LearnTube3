import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import CourseDashBoard from "../../components/Courses/CourseDashBoard";

// Course courseImg
import courseImg1 from "../../assets/img/courses/1.jpg";
import courseImg2 from "../../assets/img/courses/2.jpg";
import courseImg3 from "../../assets/img/courses/3.jpg";
import courseImg4 from "../../assets/img/courses/4.jpg";
import courseImg5 from "../../assets/img/courses/5.jpg";
import courseImg6 from "../../assets/img/courses/6.jpg";
import courseImg7 from "../../assets/img/courses/7.jpg";
import courseImg8 from "../../assets/img/courses/8.jpg";

const CoursePartClosed = (props) => {
  // const initClosedData = [
  //   {
  //     classId: "",
  //     className: "",
  //     instructorName: "",
  //     latestNotice: "",
  //     numberOfTake: "",
  //     active: "",
  //     classRoomRegDate: "",
  //   },
  // ];

  const [closedData, setClosedData] = useState(null);
  const history = useHistory();
  useEffect(() => {
    const fetchClosedClassRoom = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/classroom/closed?userId=1"
        );
        console.log(response.data);
        setClosedData(response.data);
      } catch (err) {
        console.log("err >> ", err);
      }
    };
    fetchClosedClassRoom();
  }, []);

  const listClassAdd = () => {
    document.getElementById("rs-popular-course").classList.add("list-view");
  };

  const listClassRemove = () => {
    document.getElementById("rs-popular-course").classList.remove("list-view");
  };

  return (
    <div
      id="rs-popular-course"
      className="rs-popular-courses list-view style1 course-view-style orange-style rs-inner-blog white-bg pb-100 md-pt-70 md-pb-80 text-start"
    >
      <div className="container">
        <div className="row">
          <div className="pr-50 md-pr-14">
            <div className="course-search-part">
              <div className="course-view-part ">
                <div className="view-icons">
                  <button onClick={listClassAdd} className="view-list ">
                    <i className="fa fa-list-ul"></i>
                  </button>
                  <button
                    onClick={listClassRemove}
                    className="view-grid mr-10 list-view"
                  >
                    <i className="fa fa-th-large"></i>
                  </button>
                </div>
                <div className="view-text">Showing 1-9 of 11 results</div>
              </div>
              <div className="type-form">
                <form method="post" action="#">
                  <div className="form-group mb-0">
                    <div className="custom-select-box">
                      <select id="timing">
                        <option>Default</option>
                        <option>Newest</option>
                        <option>Old</option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            {(closedData)
              ? closedData.map((closedDatas, i) => (
                  <div
                    className="course-part clearfix m-0"
                    onClick={() => {
                      history.replace({
                        pathname: "../course/course-single",
                        state: { classId: closedData[i].classId },
                      });
                    }}
                  >
                    <CourseDashBoard
                      courseClass="courses-item"
                      courseImg={courseImg1}
                      courseTitle={closedData[i].className}
                      notice={closedData[i].latestNotice}
                      progress={100}
                      openDate={closedData[i].classRoomRegDate.split("T")[0]}
                      creatorName={closedData[i].instructorName}
                    />
                  </div>
                ))
              : null}
            <div className="pagination-area orange-color text-center mt-30 md-mt-0">
              <ul className="pagination-part">
                <li className="active">
                  <Link to="#">1</Link>
                </li>
                <li>
                  <Link to="#">2</Link>
                </li>
                <li>
                  <Link to="#">
                    Next <i className="fa fa-long-arrow-right"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePartClosed;
