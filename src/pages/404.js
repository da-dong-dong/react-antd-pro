// umi的配置，已经自动支持antd-pro的按需加载
import { Exception } from 'ant-design-pro'
export default function () {
    return (
        <Exception type="404" backText="返回首页"></Exception>);
}
