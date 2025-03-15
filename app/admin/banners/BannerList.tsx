'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import toast from 'react-hot-toast';

import { Banner } from '@/lib/models/BannerModel';

export default function BannerList() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [uploading, setUploading] = useState(false);

  const fetchBanners = async () => {
    try {
      const res = await fetch('/api/admin/banners');
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }
      const data = await res.json();
      setBanners(data);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const uploadHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const toastId = toast.loading('Đang tải ảnh lên...');
    try {
      setUploading(true);
      const file = e.target.files?.[0];
      if (!file) return;

      const resSign = await fetch('/api/cloudinary-sign', {
        method: 'POST',
      });
      
      if (!resSign.ok) {
        const error = await resSign.json();
        throw new Error(error.message);
      }
      
      const { signature, timestamp } = await resSign.json();
      
      const formData = new FormData();
      formData.append('file', file);
      formData.append('signature', signature);
      formData.append('timestamp', timestamp);
      formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
      
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error('Lỗi khi tải ảnh lên Cloudinary');
      }

      const data = await res.json();

      const resBanner = await fetch('/api/admin/banners', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: data.secure_url,
        }),
      });

      if (!resBanner.ok) {
        const error = await resBanner.json();
        throw new Error(error.message);
      }

      toast.success('Tải ảnh lên thành công', {
        id: toastId,
      });
      fetchBanners();
    } catch (err: any) {
      toast.error(err.message, {
        id: toastId,
      });
    } finally {
      setUploading(false);
    }
  };

  const toggleActive = async (banner: Banner) => {
    try {
      const res = await fetch(`/api/admin/banners/${banner._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isActive: !banner.isActive,
        }),
      });
      if (!res.ok) {
        throw new Error('Có lỗi xảy ra');
      }
      fetchBanners();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const deleteBanner = async (id: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa banner này?')) return;
    try {
      const res = await fetch(`/api/admin/banners/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Có lỗi xảy ra');
      }
      toast.success('Xóa banner thành công');
      fetchBanners();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const onDragEnd = async (result: any) => {
    if (!result.destination) return;

    const items = Array.from(banners);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setBanners(items);

    try {
      await Promise.all(
        items.map((item, index) =>
          fetch(`/api/admin/banners/${item._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              order: index,
            }),
          })
        )
      );
    } catch (err: any) {
      toast.error(err.message);
      fetchBanners();
    }
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="file"
          onChange={uploadHandler}
          accept="image/*"
          disabled={uploading}
          className="file-input file-input-bordered w-full max-w-xs"
        />
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="banners">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {banners.map((banner, index) => (
                <Draggable
                  key={banner._id}
                  draggableId={banner._id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="flex items-center gap-4 rounded-lg bg-base-200 p-4"
                    >
                      <div className="relative h-24 w-48">
                        <Image
                          src={banner.image}
                          alt=""
                          fill
                          className="rounded-lg object-cover"
                        />
                      </div>
                      <div className="flex flex-1 items-center justify-between">
                        <div className="flex items-center gap-4">
                          <input
                            type="checkbox"
                            className="toggle"
                            checked={banner.isActive}
                            onChange={() => toggleActive(banner)}
                          />
                          <span>
                            {banner.isActive ? 'Đang hiển thị' : 'Đã ẩn'}
                          </span>
                        </div>
                        <button
                          className="btn btn-error btn-sm"
                          onClick={() => deleteBanner(banner._id)}
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
} 