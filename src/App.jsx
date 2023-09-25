import React, { useState } from 'react'
import Editor from '@monaco-editor/react'
import JsonToTS from 'json-to-ts'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { message, Button, FloatButton } from 'antd'
import { DeleteFilled, CopyFilled, SettingOutlined, BsBrightnessHigh, BsMoonFill } from './icons'


function App() {
  const [value, setValue] = useState('')
  const [output, setOutput] = useState('')
  const [theme, setTheme] = useState('light')

  const jsonToTypeScript = () => {
    const output = JsonToTS(JSON.parse(value))
      .reduce((type1, type2) => {
        return `${type1}\n\n${type2}`
      })
      .trim()
    setOutput(output)
  }
  return (
    <>
      <main className="app">
        <header className="header__container">
          <div className="header">
            <h3>JSON</h3>
            <div className="header__right">
              <Button type="primary" className="runBtn" onClick={jsonToTypeScript}>
                运行
              </Button>
              <Button
                icon={
                  <DeleteFilled
                    style={{
                      fontSize: '18px',
                    }}
                  />
                }
                danger
                onClick={() => setValue('{ }')}
              />
            </div>
          </div>

          <div className="header">
            <h3>Typescript</h3>
            <CopyToClipboard text={output} onCopy={() => message.success(`已复制到您的剪切板`)}>
              <Button
                icon={
                  <CopyFilled
                    style={{
                      fontSize: '18px',
                      color: '#0958d9',
                    }}
                  />
                }
              />
            </CopyToClipboard>
          </div>
        </header>

        <div className="code__container">
          <div className="code">
            <Editor
              height="90vh"
              className="editor"
              theme={theme}
              defaultLanguage="json"
              defaultValue="{ }"
              value={value}
              onChange={value => setValue(value)}
            />
          </div>
          <div className="output">
            <Editor
              height="90vh"
              className="editor"
              defaultLanguage="typescript"
              theme={theme}
              options={{
                domReadOnly: true,
                readOnly: true,
              }}
              defaultValue=""
              value={output}
              onChange={value => setOutput(value)}
            />
          </div>
        </div>
      </main>
      {/* 浮动按钮 */}
      <FloatButton.Group
        trigger="hover"
        type="primary"
        icon={
          <SettingOutlined
            style={{
              width: '18px',
              height: '18px',
            }}
          />
        }
        tooltip={<div>设置</div>}
      >
        <FloatButton icon={<BsBrightnessHigh />} onClick={() => setTheme('light')} />
        <FloatButton icon={<BsMoonFill />} onClick={() => setTheme('vs-dark')} />
      </FloatButton.Group>
    </>
  )
}

export default App
