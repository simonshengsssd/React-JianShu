import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { TopicWrapper, TopicItem } from '../style';

class Topic extends PureComponent {
  render() {
    const { list } = this.props;
    return (
      <TopicWrapper> 
        {
          list.map((item) => {
            return (
              <TopicItem key={item.get('id')}>
                <img 
                  className='topic-pic' 
                  src={item.get('imgUrl')}
                  alt=''
                />
                {item.get('title')}
              </TopicItem>
            )
          })
        }
      </TopicWrapper>
    )
  }
}


const mapState = (state) => ({
  list: state.getIn(['home', 'topicList'])

})

// 这边第二个dispatch方法设置成null， 因为小标签的功能主要是从store里面拿回
// 每个对应的数值，这个组件里不需要对store里面的数据进行改变
export default connect(mapState, null)(Topic);