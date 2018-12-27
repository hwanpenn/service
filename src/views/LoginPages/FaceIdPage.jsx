import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";
import {KNNImageClassifier} from 'deeplearn-knn-image-classifier';
import * as dl from 'deeplearn';

class FaceIdPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardAnimaton: "cardHidden",
      infoTexts: [],
      videoPlaying : false,
      training: -1,
      NUM_CLASSES: 4,
      IMAGE_SIZE: 227,
      TOPK: 10,
    };
  }
  componentWillMount(){
      this.video = document.createElement('video');
      this.video.style.marginLeft = (document.body.clientWidth/2-113)+'px';
      this.video.style.marginTop = -(document.body.clientWidth/2-113)+'px';
      this.video.style.position = 'absolute';
      this.video.style.zIndex = '999';
      this.video.setAttribute('autoplay', '');
      this.video.setAttribute('playsinline', '');
      this.knn = new KNNImageClassifier(this.state.NUM_CLASSES, this.state.TOPK);

      // 输出到页面
      document.body.appendChild(this.video);
      navigator.mediaDevices.getUserMedia({video: true, audio: false})
          .then((stream) => {
            // this.setState({stream:stream})
              this.video.srcObject = stream;
              this.video.width = this.state.IMAGE_SIZE;
              this.video.height = this.state.IMAGE_SIZE;
              //
              this.video.addEventListener('playing', ()=> this.setState({videoPlaying : true}));
              this.video.addEventListener('paused', ()=> this.setState({videoPlaying : false}));
              // alert("agree")
          })
      for(let i=0;i<this.state.NUM_CLASSES; i++){
          //定义div
          const div = document.createElement('div');
          document.body.appendChild(div);
          div.style.textAlign = 'center';
          div.style.position = 'absolute';
          div.style.zIndex = '9999';
          div.style.marginLeft = (document.body.clientWidth/2-113)+'px';
          div.style.marginTop = -(document.body.clientWidth/2-513+40*i)+'px';

          // 定义按钮
          const button = document.createElement('button')
          button.innerText = "训练 "+i;
          div.appendChild(button);

          // 添加事件
          button.addEventListener('mousedown', () => this.buttonClickDown(i));
          // button.addEventListener('mousedown', (i) => this.buttonClickDown(i));
          button.addEventListener('mouseup', () => this.buttonClickUp());

          //定义文字信息
          const infoText = document.createElement('span')
          infoText.innerText = " 没有添加样本";
          div.appendChild(infoText);
          this.state.infoTexts.push(infoText);
      }
      this.knn.load()
          .then(() => this.start());
  }
  buttonClickDown(i){
      this.setState({
          training : i
      })
  }
  buttonClickUp(){
      this.setState({
          training : -1
      })
  }
  start(){
      if (this.timer) {
          this.stop();
      }
      this.video.play();
      this.timer = requestAnimationFrame(this.animate.bind(this));
  }

  stop(){
      this.video.pause();
      cancelAnimationFrame(this.timer);
  }

  animate(){
      //video播放的情况下
      if(this.state.videoPlaying){
          // 从video拿图片
          const image = dl.fromPixels(this.video);
          // 按下按钮就是就是训练过程 这时候的图片要给到训练器中
          if(this.state.training !== -1){
              // 添加图片和标签到分类器
              this.knn.addImage(image, this.state.training)
              // document.createElement('img')
          }
          //不是训练模式 就是测试模式 测试模式直接把图片交给模型
          // 从模型获取样本数
          const exampleCount = this.knn.getClassExampleCount();
          //如果有样本
          if(Math.max(...exampleCount) > 0){
              //预测图片 给出分类标签
              this.knn.predictClass(image)
                  .then((res)=>{
                      for(let i=0;i<this.state.NUM_CLASSES; i++){
                          // 获取分类标签
                          if(res.classIndex === i){
                              // 文字加粗 加颜色
                              this.state.infoTexts[i].style.fontWeight = 'bold';
                              this.state.infoTexts[i].style.color = '#f46d7a';
                          } else {
                              this.state.infoTexts[i].style.fontWeight = 'normal';
                              this.state.infoTexts[i].style.color = '#000000';
                          }

                          // Update info text
                          if(exampleCount[i] > 0){
                              this.state.infoTexts[i].innerText = ` ${exampleCount[i]} 个样本 - ${res.confidences[i]*100}%`
                          }
                      }
                  })
                  // 释放图片内存
                  .then(()=> image.dispose())
          } else {
              //释放图片内存
              image.dispose()
          }
      }
      this.timer = requestAnimationFrame(this.animate.bind(this));
  }
  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears

    setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      500
    );
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.content}>
          <div className={classes.container}>
          </div>
      </div>
    );
  }
}

FaceIdPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(FaceIdPage);
