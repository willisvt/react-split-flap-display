import React, { useState, ChangeEvent, SetStateAction } from 'react';
import { ColorChangeHandler } from 'react-color';
import SplitFlapDisplay, { ALPHA, NUMERIC, PUNCTUATION } from './ReactSplitFlapDisplay';

import CodeBlock from './CodeBlock';
import Swatch from './Swatch';
import Wrapper from './Wrapper';
import { defaultInputs } from './constants';

type DefaultInputKeys = keyof defaultInputs;

const typeToCharSetArray = {
  numeric: NUMERIC,
  alpha: ALPHA,
  alphanumeric: [...ALPHA, ...NUMERIC],
  punctuation: [...ALPHA, ...PUNCTUATION, ...NUMERIC],
};

const typeToCharSet = {
  numeric: 'NUMERIC',
  alpha: 'ALPHA',
  alphanumeric: '[...ALPHA, ...NUMERIC]',
  punctuation: '[...ALPHA, ...PUNCTUATION, ...NUMERIC]',
};

const App: React.FC<Record<string, never>> = () => {
  const [exampleSet, setExampleSet] = useState<DefaultInputKeys>('punctuation');
  const [background, setBackground] = useState<string>('#000000');
  const [borderColor, setBorderColor] = useState<string>('#dddddd30');
  const [borderWidth, setBorderWidth] = useState<string>('1px');
  const [characterWidth, setCharacterWidth] = useState<string>('.8em');
  const [fontSize, setFontSize] = useState<string>('4.4em');
  // const [minLength, setMinLength] = useState<number>(defaultInputs.numeric.length);
  const [minLength, setMinLength] = useState<number>(52);
  const [padDirection, setPadDirection] = useState<string>('right');
  const [value, setValue] = useState<string>(defaultInputs.punctuation);
  const [textColor, setTextColor] = useState<string>('#dddddd');
  const [step, setStep] = useState<number>(96);
  const [withSound, setWithSound] = useState<boolean | string>(true);
  const [withCustomSound, setWithCustomSound] = useState<string>('');

  const generateInputHandler =
    (setFn: SetStateAction<any>) =>
    (event: ChangeEvent<HTMLInputElement>): void =>
      setFn(event.target.value);
  const generateColorInputHandler =
    (setFn: SetStateAction<any>): ColorChangeHandler =>
    (color): void =>
      setFn(color.hex);
  const onWithSoundToggle = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === 'false') {
      setWithSound(false);
    }
    if (event.target.value === 'true') {
      setWithSound(true);
    }
    if (event.target.value === 'custom') {
      setWithSound(withCustomSound);
    }
  };
  const onCustomSoundInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (typeof withSound === 'string') {
      setWithSound(event.target.value);
    }
    setWithCustomSound(event.target.value);
  };

  const onSelect = (event: ChangeEvent<HTMLSelectElement>): void => {
    const selectedExample = event.target.value as DefaultInputKeys;
    if (selectedExample !== exampleSet) {
      const newValue = defaultInputs[selectedExample];
      setExampleSet(selectedExample);
      setValue(newValue);
      setMinLength(newValue.length);
    }
  };

  return (
    <div className="container">
      {/* <h3>React Split Flap Display</h3> */}
      <div className="flex-container-vertical">
        <div className="board-display-wrapper">
          <Wrapper>
            <SplitFlapDisplay
              background={background}
              borderColor={borderColor}
              borderWidth={borderWidth}
              characterSet={typeToCharSetArray[exampleSet]}
              characterWidth={characterWidth}
              fontSize={fontSize}
              minLength={minLength}
              padDirection={padDirection}
              step={step}
              textColor={textColor}
              value={value}
              withSound={withSound}
            />
          </Wrapper>
        </div>
        <div className="flex-container-horizontal board-config-wrap">
          <div>
            <Wrapper>
              <div>
                <label>
                  display:&nbsp;
                  <input style={{ width: '300px' }} value={value} onChange={generateInputHandler(setValue)} />
                </label>
              </div>
              <div>
                character set:&nbsp;
                <select value={exampleSet} onChange={onSelect}>
                  <option value="numeric">0-9</option>
                  <option value="alpha">A-Z</option>
                  <option value="alphanumeric">A-Z with 0-9</option>
                  <option value="punctuation">A-Z with punctuation</option>
                </select>
              </div>
              <div>
                character width:&nbsp;
                <input value={characterWidth} onChange={generateInputHandler(setCharacterWidth)} />
              </div>
              <div>
                <label>
                  min length:&nbsp;
                  <input type="number" value={minLength} onChange={generateInputHandler(setMinLength)} />
                </label>
              </div>
              <div>
                <label>
                  pad direction:&nbsp;
                  <label>
                    <input
                      type="radio"
                      value="right"
                      onChange={generateInputHandler(setPadDirection)}
                      checked={padDirection === 'left'}
                    />
                    left
                  </label>
                  &nbsp;
                  <label>
                    <input
                      type="radio"
                      value="right"
                      onChange={generateInputHandler(setPadDirection)}
                      checked={padDirection === 'right'}
                    />
                    right
                  </label>
                </label>
              </div>
              <div>
                <label>
                  step (ms):&nbsp;
                  <input type="number" value={step} onChange={generateInputHandler(setStep)} />
                </label>
              </div>
            </Wrapper>
            <Wrapper>
              <div>
                background color:&nbsp;
                <Swatch color={background} onChange={generateColorInputHandler(setBackground)} />
              </div>
              <div>
                border color:&nbsp;
                <Swatch color={borderColor} onChange={generateColorInputHandler(setBorderColor)} />
              </div>
              <div>
                text color:&nbsp;
                <Swatch color={textColor} onChange={generateColorInputHandler(setTextColor)} />
              </div>
            </Wrapper>
            <Wrapper>
              <div>
                border width:&nbsp;
                <input value={borderWidth} onChange={generateInputHandler(setBorderWidth)} />
              </div>
              <div>
                font size:&nbsp;
                <input value={fontSize} onChange={generateInputHandler(setFontSize)} />
              </div>
            </Wrapper>
            <Wrapper>
              <div>
                <label>
                  with sound:&nbsp;
                  <label>
                    <input type="radio" value="false" onChange={onWithSoundToggle} checked={withSound === false} />
                    no sound
                  </label>
                  &nbsp;
                  <label>
                    <input type="radio" value="true" onChange={onWithSoundToggle} checked={withSound === true} />
                    default sound
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="custom"
                      onChange={onWithSoundToggle}
                      checked={typeof withSound === 'string'}
                    />
                    custom sound source
                  </label>
                </label>
                &nbsp;
                {typeof withSound === 'string' && <input value={withCustomSound} onChange={onCustomSoundInput} />}
              </div>
            </Wrapper>
          </div>
          <CodeBlock
            // withSound={withSound}
            background={background}
            borderColor={borderColor}
            borderWidth={borderWidth}
            characterSet={typeToCharSet[exampleSet]}
            characterWidth={characterWidth}
            fontSize={fontSize}
            minLength={minLength}
            padDirection={padDirection}
            step={step}
            textColor={textColor}
            value={value}
            withSound={JSON.stringify(withSound)}
          />
        </div>
      </div>
      <a href="https://github.com/robonyong/react-split-flap-display">github</a>
    </div>
  );
};

export default App;
