export default function Footer() {
    return (
        <footer>
            <div className="wrapper text-center py-6">
                <p>
                    Copyright © {new Date().getFullYear()},{' '}
                    <a href="https://github.com/crodic" target="_blank" rel="noopener noreferrer">
                        Crodic
                    </a>
                    . All rights reserved.
                </p>
            </div>
        </footer>
    );
}
