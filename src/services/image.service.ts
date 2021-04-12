import { RcFile } from 'antd/lib/upload';
import axios, { AxiosResponse } from 'axios';

export interface ImageServiceResponse {
    secure_url: string;
}

export class ImageService {
    async execute(file: RcFile): Promise<AxiosResponse<ImageServiceResponse>> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'lvpkg390');
        return await axios.post(process.env.REACT_APP_API_IMAGE || '', formData);
    }
}
