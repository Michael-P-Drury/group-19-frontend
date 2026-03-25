'use client';

import { useRouter }                        from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';

import Cookies from 'js-cookie';

export default function HomePage() {
    return (
        <div className="Home">
          <p> Home Page </p>
        </div>
    );
}
