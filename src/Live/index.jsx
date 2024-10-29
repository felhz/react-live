import { evaluateSync } from '@mdx-js/mdx';
import * as Antd from 'antd';
import { useEffect, useRef, useState } from 'react';
import runTime from 'react/jsx-runtime';

import Editor from '../Editor';
import styles from './index.module.css';
// const v = compileSync('import {name} from "../util/common.js"\n\n {name}');

const files = import.meta.glob('/src/components/*.jsx');
// console.log(await files['/src/components/index.jsx']());
const options = Object.keys(files).map((key, index) => {
  return {
    label: key,
    value: index,
    fn: files[key],
  };
});
const defaultOptions = () => {
  return '';
};
function Live() {
  const Com = useRef(null);
  const [current, setCurrent] = useState('');
  const [code, setCode] = useState(``);
  const mdxRef = useRef(null);
  const editorChange = (v) => {
    console.log(v);
    mdxRef.current = evaluateSync(v, {
      ...runTime,
      baseUrl: import.meta.url,
    });
    setCode(v);
  };
  useEffect(() => {
    const init = async () => {
      Com.current = (await options[0].fn()).default;
      setCurrent(0);
    };
    init();
  }, []);

  console.log(mdxRef.current);

  useEffect(() => {
    console.log(Com.current);
  }, [current]);
  return (
    <div className={styles.container}>
      <div style={{ flex: '1' }}>
        选择组件(可以直接使用antd组件)：
        <Antd.Select
          options={options}
          value={current}
          onChange={async (v) => {
            Com.current = (await options[v].fn()).default;
            setCurrent(v);
          }}
        ></Antd.Select>
        <Editor code={code} onChange={editorChange}></Editor>
      </div>

      <div style={{ width: '50%', padding: '0 10px' }}>
        预览：
        {mdxRef.current && (
          <mdxRef.current.default
            components={{
              ...Antd,
              Com: Com.current || defaultOptions,
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Live;
