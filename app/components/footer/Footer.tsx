import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-base-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 py-12 md:grid-cols-12">
          {/* Logo và Giới thiệu */}
          <div className="md:col-span-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-10 w-10">
                <Image
                  src="/images/logo.png"
                  alt="LokCok"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-bold">LokCok</span>
            </Link>
            <p className="mt-4 text-base-content/70">
              Nền tảng mua bán đồ second-hand của KOLs và KOCs hàng đầu Việt Nam. 
              Chúng tôi kết nối người bán và người mua trong một cộng đồng tin cậy.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-circle btn-ghost btn-sm"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-circle btn-ghost btn-sm"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Liên kết nhanh */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-bold">Khám Phá</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/about" className="link-hover text-base-content/70">
                  Về Chúng Tôi
                </Link>
              </li>
              <li>
                <Link href="/products" className="link-hover text-base-content/70">
                  Sản Phẩm
                </Link>
              </li>
              <li>
                <Link href="/blog" className="link-hover text-base-content/70">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="link-hover text-base-content/70">
                  Liên Hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Hỗ trợ */}
          <div className="md:col-span-3">
            <h3 className="text-lg font-bold">Hỗ Trợ</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/faq" className="link-hover text-base-content/70">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="link-hover text-base-content/70">
                  Chính Sách Vận Chuyển
                </Link>
              </li>
              <li>
                <Link href="/return" className="link-hover text-base-content/70">
                  Chính Sách Đổi Trả
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="link-hover text-base-content/70">
                  Chính Sách Bảo Mật
                </Link>
              </li>
            </ul>
          </div>

          {/* Liên hệ */}
          <div className="md:col-span-3">
            <h3 className="text-lg font-bold">Liên Hệ</h3>
            <ul className="mt-4 space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <span className="text-base-content/70">
                  Tầng 4, Tòa nhà ABC<br />
                  123 Đường XYZ, Quận 1<br />
                  TP. Hồ Chí Minh
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-primary" />
                <a href="tel:1900123456" className="link-hover text-base-content/70">
                  1900 123 456
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-primary" />
                <a
                  href="mailto:support@lokcok.vn"
                  className="link-hover text-base-content/70"
                >
                  support@lokcok.vn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-base-content/10 py-6">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-base-content/70 md:flex-row">
            <p>© 2024 LokCok. Tất cả quyền được bảo lưu.</p>
            <div className="flex gap-4">
              <Link href="/terms" className="link-hover">
                Điều khoản sử dụng
              </Link>
              <Link href="/privacy" className="link-hover">
                Chính sách bảo mật
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 