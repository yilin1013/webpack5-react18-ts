import './index.less';
import img1 from './assets/1.webp';
import img2 from './assets/2.jpg';
function App() {
  return (
    <div>
        <div className='app'>webpack5-react-ts</div>
        <div className='bg'>
            <div className='text'></div>背景图片</div>
        <div className="img">
            <div className='text img-c' style={{}}>img 图片</div>
            <div className='img-c'><img src={img1}/></div>
            <div className='img-c'><img src={img2}/></div>
        </div>
    </div>
  )
  
}
export default App