import React, { Component } from 'react'
import "./groupList.css";
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import API2 from '../../utils/API2';
import { Link } from "react-router-dom"

export default class GroupList extends Component {
  state = {
    groups: []
  }



  componentDidMount() {
    this.getAllGroups()
  }

  getAllGroups = () => {
    API2.getAllGroups()
      .then(res => {
        this.setState({ groups: res.data })
      })

      .catch(err => console.log(err))
  }

  // createGroups = () => {

  //   API2.createGroup(
  //     {
  //       "groupName": "real groups",
  //       "groupType": "tennis group",
  //       "groupPrivacy": "public"
  //     })
  //     .then(res => {
  //       console.log(res)
  //     })

  //     .catch(err => console.log(err))
  // }

  render() {
    return (
      <div className="groupContainer" >
        <div className="titleContainer">
          <h1 className="titles"> Groups</h1>
        </div>
        <div className="addBtnWrapper">
          < Link to={"/groupCreate"}>
            <label className="grpBtnLabel">Create A Group

              <button type="button" className="addGroupBtn"><h2>+</h2></button>

            </label>
          </Link>
        </div>

        {this.state.groups.length ? (

          <div className="cardContainer">
            {this.state.groups.map(content => {
              return (

                <Card border="dark" className="m-5 grpCard" style={{ width: '16rem' }} key={content._id}>
                  <Card.Img variant="top" src="/groups2.png" style={{ maxHeight: "8rem", maxWidth: "7rem" }} className="mx-auto m-2" />
                  <Card.Body>
                    <Card.Title>{content.groupName}</Card.Title>
                    <Card.Text>
                     {content.groupDescription}
                    </Card.Text>
                    <Link to={"/theGroup/"+content._id}>
                    <Button type="button" variant="primary">open group</Button>
                    </Link>
                  </Card.Body>
                </Card>

              )
            })}
          </div>

        ) : (<h1>there are no groups to display yet be the first to create a group</h1>
        )}
      </div>

    )
  }
}
