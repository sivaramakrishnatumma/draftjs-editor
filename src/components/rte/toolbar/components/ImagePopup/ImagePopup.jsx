import { useState, useRef } from 'react';
import { Form } from 'react-bootstrap';
import { FormattedMessage, useIntl } from 'react-intl';
import useOnClickOutside from 'use-onclickoutside';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faTimes } from '@fortawesome/free-solid-svg-icons';
import { uploadFile } from '../../../../../test-builder/services/file.service';
import { toastify } from '../../../../../common/components/Toastify';
import { useEditorContext } from '../../../provider/EditorContext';
import { useAppContext } from '../../../../../test-builder/context/AppContext';
import './ImagePopup.css';

// const MAX_ALLOWED_FILE_SIZE = process.env.REACT_APP_MAX_FILE_SIZE_ALLOWED;

const DEFAULT_STATE = {
  file: null,
  width: '',
  height: '',
  widthType: 'auto',
  heightType: 'auto',
  type: 'block',
};

/**
 * ImagePopup component
 *
 * @param {Function} onChange - callback function to update the image state
 */
const ImagePopup = ({ onChange }) => {
  const { dispatchEvent } = useAppContext();
  const intl = useIntl();
  const ref = useRef();
  const imageInputRef = useRef();
  const { activeEditorState } = useEditorContext();
  const [showImageUploader, setShowImageUploader] = useState();
  const [imageState, setImageState] = useState(DEFAULT_STATE);

  useOnClickOutside(ref, () => {
    if (showImageUploader) {
      setShowImageUploader(false);
    }
  });

  /**
   * Handle state changes
   */
  const handleStateChange = event => {
    const { name, value } = event.target;
    setImageState(state => ({ ...state, [name]: value }));
  };

  /**
   * Open image uploader
   */
  const openImageUploader = event => {
    event.preventDefault();
    if (activeEditorState) {
      setShowImageUploader(!showImageUploader);
    }
  };

  /**
   * Handle file change
   */
  async function handleFileChange(event) {
    event.preventDefault();
    const file = event.target.files[0];
    // const fileSize = (file.size / 1024 / 1024).toFixed(4);
    // if (fileSize <= MAX_ALLOWED_FILE_SIZE) {
    setImageState(state => ({ ...state, file }));
    // } else {
    //   imageInputRef.current.value = null;
    //   toastify.showErrorToast(intl.formatMessage({ id: 'error.maxFileSizeExceeded' }, { size: MAX_ALLOWED_FILE_SIZE }));
    // }
  }

  /**
   * Handle add to question button click
   */
  const handleAddToQuestion = async event => {
    event.preventDefault();
    dispatchEvent('SHOW_LOADER');

    const formData = new FormData();
    formData.append('file', imageState.file);
    try {
      const src = await uploadFile(formData);
      onChange({ ...imageState, src });
    } catch (error) {
      toastify.showErrorToast(intl.formatMessage({ id: 'HTMLEditor.FailedToUploadImage' }));
    } finally {
      setShowImageUploader(false);
      setImageState(DEFAULT_STATE);
      dispatchEvent('HIDE_LOADER');
    }
  };

  /**
   * Handle delete image
   */
  const hanldeDeleteImage = event => {
    event.preventDefault();
    setImageState(state => ({ ...state, file: null }));
  };

  return (
    <div ref={ref} className="image-upload-wrapper">
      <div className="toolbar-item picker-icon" onClick={openImageUploader} title="Upload Image">
        <FontAwesomeIcon icon={faImage} />
      </div>
      <div className="image-uploader" style={{ display: showImageUploader ? 'block' : 'none' }}>
        {imageState.file ? (
          <div className="file-container">
            <div className="selected-files">
              <span className="file-name text-truncate">{imageState.file?.name}</span>
              <button className="delete-icon" onClick={hanldeDeleteImage}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          </div>
        ) : (
          <div className="upload-btn-wrapper">
            <button className="upload-btn">
              <FormattedMessage id="HTMLEditor.ImageUpload" />
            </button>
            <input
              ref={imageInputRef}
              type="file"
              name="myfile"
              accept="image/png, image/gif, image/jpeg"
              onChange={handleFileChange}
            />
            <div className="image-upload-helper-text">
              {/* <FormattedMessage id="HTMLEditor.UploadImageHelperText" values={{ size: MAX_ALLOWED_FILE_SIZE }} /> */}
            </div>
          </div>
        )}

        <div className="image-details-wrapper">
          <div className="field-wrapper">
            <label className="legend" htmlFor="image-width">
              Width:
            </label>
            <Form.Check
              label="auto"
              name="widthType"
              type="radio"
              id="image_width_auto"
              checked={imageState.widthType === 'auto'}
              value="auto"
              onChange={handleStateChange}
            />
            <Form.Check
              label="px"
              name="widthType"
              type="radio"
              id="image_width_px"
              checked={imageState.widthType === 'px'}
              value="px"
              onChange={handleStateChange}
            />
            {imageState.widthType === 'px' && (
              <Form.Control type="text" name="width" value={imageState.width} onChange={handleStateChange} />
            )}
          </div>

          <div className="field-wrapper">
            <label className="legend" htmlFor="image-width">
              Height:
            </label>
            <Form.Check
              label="auto"
              name="heightType"
              type="radio"
              id="image_height_auto"
              checked={imageState.heightType === 'auto'}
              value="auto"
              onChange={handleStateChange}
            />
            <Form.Check
              label="px"
              name="heightType"
              type="radio"
              id="image_height_px"
              checked={imageState.heightType === 'px'}
              value="px"
              onChange={handleStateChange}
            />
            {imageState.heightType === 'px' && (
              <Form.Control type="text" name="height" value={imageState.height} onChange={handleStateChange} />
            )}
          </div>

          {/* <div className="field-wrapper">
            <label className="legend" htmlFor="image-width">
              Type:
            </label>
            <Form.Check
              label="block"
              name="type"
              type="radio"
              id="image_type_block"
              checked={imageState.type === 'block'}
              value="block"
              onChange={handleStateChange}
            />
            <Form.Check
              label="inline"
              name="type"
              type="radio"
              id="image_type_inline"
              checked={imageState.type === 'inline'}
              value="inline"
              onChange={handleStateChange}
            />
          </div> */}
        </div>

        <button className="add-to-document-btn" disabled={!imageState.file} onClick={handleAddToQuestion}>
          <FormattedMessage id="HTMLEditor.AddtoQuestion" />
        </button>
      </div>
    </div>
  );
};

export default ImagePopup;
