import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ROOT } from './Portal';
import LineBlock from './LineBlock';
import TableBlock from './TableBlock';
import IlluPhoneBlock from './IlluPhoneBlock';
import IlluScooterBlock from './IlluScooterBlock';
import FacDashBlock from './DashboardLocations'
import AddBlock from './AddBlock';
import '../styles/Home.css';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      addBlock: false,
      tempStuffForPresentation: false
    }
    this.addNewBlock = this.addNewBlock.bind(this);
  }

  addNewBlock() {
    // TODO
    // when adding the new block, --> ADD the new block in here

    // TEMP FOR PRES
    if (this.state.addBlock) {
      this.setState({
        addBlock: !this.state.addBlock,
        tempStuffForPresentation: true
      })
    } else {
      this.setState({
        addBlock: !this.state.addBlock
      })
    }
  }

  render() {
    const { addBlock } = this.state;
    const { blocks } = this.props;


    return (
      <div className="content">
        <Link to={`${ROOT}/addlocation`} id="AddlocationDash" className="blockk add-block">+ ADD LOCATION</Link>
        <div className="text-block">
          <h1>FAVORITE LOCATIONS<span className="inline-button"> add location + </span></h1>
          <h2> you may save or remove your own personally defined locations for easier access. </h2>
        </div>
        <FacDashBlock/>
        { addBlock 
          ? <AddBlock addNewBlock={this.addNewBlock}/>
          : <div 
              className="blockk add-block"
              onClick={() => this.addNewBlock()}
            >+ ADD BLOCK</div>
        }
        <div className="text-block">
            <h1>blocks <span className="inline-button"> add block + </span></h1>
            <h2> These are your own personally defined blocks, you may add and remove as you like to customize your dashboard </h2>
        </div>
        <div className="block-wraper">

          {this.state.tempStuffForPresentation ? <LineBlock/> : ''}
          
          {blocks.map((block) => {
            
            switch(block.blockType) {
              // TEMP DO BETTER
              case 'PHONE':
                return <IlluPhoneBlock key={block.id}/>
              case 'TABLE':
                return <TableBlock key={block.id}/>
              case 'SCOOTER':
                return <IlluScooterBlock key={block.id}/>
              case 'LINE':
                return <LineBlock key={block.id}/>
            }
          })}
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    blocks: state.blocksReducer.blocks
  }
}

export default connect(mapStateToProps)(Home);