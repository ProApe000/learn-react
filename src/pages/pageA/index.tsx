import { } from 'react'
import { useLocation } from 'react-router-dom'
import { } from 'antd'
import styles from './index.module.less'
const PageA: React.FC = () => {
    const location = useLocation()
    console.log('pageA', location.state, location.search)
    return <div>pageA
        {/* <img src="https://lf3-static.bytednsdoc.com/obj/eden-cn/211eh7uldvhpeht/Group 1912057890.png" alt="" /> */}
        <div className={styles.myFont}>使用外部字体</div>
    </div>
}


export default PageA