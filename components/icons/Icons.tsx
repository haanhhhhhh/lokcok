import { Truck, Wallet, LockKeyhole, Phone } from 'lucide-react';

const Icons = () => {
  return (
    <div className='grid grid-cols-2 gap-6 gap-x-2 md:gap-x-6 lg:grid-cols-4'>
      <div className='flex flex-col justify-center gap-4 bg-base-300 px-4 py-8 md:px-12'>
        <Truck width={48} height={48} strokeWidth={1} />
        <div className='flex flex-col gap-2'>
          <p>
            <strong>Miễn Phí Vận Chuyển</strong>
          </p>
          <p>Cho đơn hàng trên 5 triệu</p>
        </div>
      </div>
      <div className='flex flex-col justify-center gap-4 bg-base-300 px-4 py-8 md:px-12'>
        <Wallet width={48} height={48} strokeWidth={1} />
        <div className='flex flex-col gap-2'>
          <p>
            <strong>Hoàn Tiền</strong>
          </p>
          <p>Đảm bảo trong 30 ngày</p>
        </div>
      </div>
      <div className='flex flex-col justify-center gap-4 bg-base-300 px-4 py-8 md:px-12'>
        <LockKeyhole width={48} height={48} strokeWidth={1} />
        <div className='flex flex-col gap-2'>
          <p>
            <strong>Thanh Toán An Toàn</strong>
          </p>
          <p>Bảo mật bởi Stripe</p>
        </div>
      </div>
      <div className='flex flex-col justify-center gap-4 bg-base-300 px-4 py-8 md:px-12'>
        <Phone width={48} height={48} strokeWidth={1} />
        <div className='flex flex-col gap-2'>
          <p>
            <strong>Hỗ Trợ 24/7</strong>
          </p>
          <p>Qua điện thoại và email</p>
        </div>
      </div>
    </div>
  );
};

export default Icons;
