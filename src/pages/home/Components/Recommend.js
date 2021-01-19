import React, { PureComponent } from 'react';
import { RecommendeWrapper, RecommendItem } from '../style';
import { connect } from 'react-redux';

class Recommend extends PureComponent {
  render() {
    return (
      <RecommendeWrapper>
        {
          this.props.list.map((item) => {
            return <RecommendItem imgUrl={item.get('imgUrl')} key={item.get('id')}/>
          })
        }
      </RecommendeWrapper>
    )
  }
}

const mapState = (state) => ({
  list: state.getIn(['home', 'recommendList'])
})

export default connect(mapState, null)(Recommend);