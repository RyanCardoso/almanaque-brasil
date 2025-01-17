import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

//Component
import Footer from '../../components/footer/footerMenu';
import Map from './Map';
import ProgressHeader from '../../components/progressHeader';
import TrailCompletedModal from '../../components/modal/trailCompletedModal';

//Redux
import { selectedTrails } from '../../dataflow/modules/trails-module';
import { getTrailsThunk } from '../../dataflow/thunks/trails-thunk';

const mapStateToProps = state => ({
  trails: state.trails.data,
});

const mapDispatchToProps = dispatch => ({
  selectedTrails: (info) => {
    dispatch(selectedTrails(info));
  },

  getTrailsThunk: () => {
    dispatch(getTrailsThunk());
  },
});

export const Card = styled.button`
  min-height: 150px;
  margin: 10px;
  border-radius: 25px;
  padding: 25px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  > h1,h2 {
    text-decoration: none;
  }
  background-color: #fff;

  &:hover{
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }
`;

export const Box = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: #f3f3f3;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Trails = (props) => {
  const [isModalTrailCompleted, setIsModalTrailCompleted] = useState(undefined);

	useEffect(() => {
		props.getTrailsThunk();
    // setIsModalTrailCompleted(true);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

  const handleClick = (trail) => {
    props.history.push({pathname: '/activities'});
    props.selectedTrails(trail);
  }

  const handleCloseModal = () => {
    setIsModalTrailCompleted(false);
  }

  const renderTrails = (trails) => {
    return trails.map((trail, key) => {
      return (
        <Card key={key} onClick={() => handleClick(trail.id)}>
          <h2>{`Trilha ${trail.id}`}</h2>
        </Card>
      )
    })
  }

  const trails = props?.trails;

  return (
    <Box>
      <ProgressHeader />
      {
        trails && (
          <>
            {/* {renderTrails(trails)} */}
            <Map trails={trails} goToActivitie={handleClick}></Map>
          </>
        ) 
      }
      <Footer screen='trails' />
      {isModalTrailCompleted && <TrailCompletedModal handleCloseModal={handleCloseModal} /> }
    </Box>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Trails);