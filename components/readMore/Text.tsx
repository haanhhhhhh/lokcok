import React from 'react';

const Text = () => {
  return (
    <div className='space-y-4'>
      <h2 className='text-2xl font-bold'>Về LokCok</h2>
      <p>
        LokCok là nền tảng thương mại điện tử đầu tiên tại Việt Nam chuyên về mua bán các sản phẩm đã qua sử dụng từ
        KOLs (Key Opinion Leaders) và KOCs (Key Opinion Consumers). Chúng tôi tạo ra một môi trường an toàn và đáng tin cậy
        cho người hâm mộ có thể sở hữu những món đồ độc đáo từ những người có ảnh hưởng mà họ yêu thích.
      </p>

      <h3 className='text-xl font-semibold'>Điểm Khác Biệt</h3>
      <ul className='list-inside list-disc space-y-2'>
        <li>
          <span className='font-semibold'>Chứng Nhận Nguồn Gốc:</span> Mỗi sản phẩm đều có
          chứng nhận xác thực từ KOL/KOC, kèm theo hình ảnh hoặc video về việc sử dụng sản phẩm trong content.
        </li>
        <li>
          <span className='font-semibold'>Độc Quyền:</span> Nhiều sản phẩm là phiên bản
          giới hạn hoặc được sử dụng trong các video/content viral.
        </li>
        <li>
          <span className='font-semibold'>Kiểm Duyệt Nghiêm Ngặt:</span> Tất cả
          sản phẩm đều được kiểm tra kỹ càng về chất lượng và nguồn gốc trước khi được đăng bán.
        </li>
        <li>
          <span className='font-semibold'>Bảo Vệ Người Mua:</span> Hệ thống thanh toán đảm
          bảo, cho phép kiểm tra hàng trước khi thanh toán.
        </li>
      </ul>

      <h3 className='text-xl font-semibold'>Cam Kết Của Chúng Tôi</h3>
      <p>
        LokCok cam kết mang đến trải nghiệm mua sắm an toàn và đáng tin cậy. Chúng tôi
        không chỉ là nền tảng mua bán, mà còn là cầu nối giữa những người có ảnh hưởng và
        người hâm mộ của họ, tạo ra một cộng đồng gắn kết và những trải nghiệm mua sắm độc đáo.
      </p>

      <div className='rounded-lg bg-base-200 p-4'>
        <p className='font-semibold'>
          Hãy tham gia cùng chúng tôi trong hành trình xây dựng cộng đồng mua bán đồ second-hand 
          độc đáo và an toàn nhất Việt Nam!
        </p>
      </div>
    </div>
  );
};

export default Text;
