import React, { useState } from 'react';
import axios from 'axios';

function MyForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    checkboxes: {
      option1: false,
      option2: false,
      option3: false,
      option4: false,
      option5: false
    },
    files: {
      file1: null,
      file2: null,
      file3: null
    },
    textarea: '',
    propertyType: '매매',
    structure: '원룸'
  });

  const handleChange = (event) => {
    const { name, value, type, checked, files } = event.target;

    if (type === 'checkbox') {
      setFormData({
        ...formData,
        checkboxes: {
          ...formData.checkboxes,
          [name]: checked
        }
      });
    } else if (type === 'file') {
      setFormData({
        ...formData,
        files: {
          ...formData.files,
          [name]: files[0]
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // 서버 URL
    const url = '/upload'; // 실제 서버 URL로 바꿔야 합니다

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('propertyType', formData.propertyType);
    data.append('structure', formData.structure);
    
    // 체크박스 값 전송
    Object.entries(formData.checkboxes).forEach(([key, value]) => {
      if (value) {
        data.append('checkboxes', key);
      }
    });

    // 파일 업로드 전송
    Object.entries(formData.files).forEach(([key, file]) => {
      if (file) {
        data.append(key, file);
      }
    });

    // 텍스트 영역 값 전송
    data.append('textarea', formData.textarea);

    axios.post(url, data)
      .then(response => {
        // 서버 응답 처리
        console.log(response);
      })
      .catch(error => {
        // 에러 처리
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <label>
        Option 1:
        <input type="checkbox" name="option1" checked={formData.checkboxes.option1} onChange={handleChange} />
      </label>
      <label>
        Option 2:
        <input type="checkbox" name="option2" checked={formData.checkboxes.option2} onChange={handleChange} />
      </label>
      <label>
        Option 3:
        <input type="checkbox" name="option3" checked={formData.checkboxes.option3} onChange={handleChange} />
      </label>
      <label>
        Option 4:
        <input type="checkbox" name="option4" checked={formData.checkboxes.option4} onChange={handleChange} />
      </label>
      <label>
        Option 5:
        <input type="checkbox" name="option5" checked={formData.checkboxes.option5} onChange={handleChange} />
      </label>
      <label>
        File 1:
        <input type="file" name="file1" onChange={handleChange} />
      </label>
      <label>
        File 2:
        <input type="file" name="file2" onChange={handleChange} />
      </label>
      <label>
        File 3:
        <input type="file" name="file3" onChange={handleChange} />
      </label>
      <label>
        Textarea:
        <textarea name="textarea" value={formData.textarea} onChange={handleChange} />
      </label>
      <label>
        Property Type:
        <select name="propertyType" value={formData.propertyType} onChange={handleChange}>
          <option value="매매">매매</option>
          <option value="전세">전세</option>
          <option value="월세">월세</option>
        </select>
      </label>
      <label>
        Structure:
        <select name="structure" value={formData.structure} onChange={handleChange}>
          <option value="원룸">원룸</option>
          <option value="1.5룸">1.5룸</option>
          <option value="2룸 이상">2룸 이상</option>
        </select>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default MyForm;
