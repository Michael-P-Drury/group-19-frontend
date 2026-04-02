'use client';

import { useRouter } from 'next/navigation';

export default function WellbeingPage() {
    const router = useRouter();

    return (
        <div style={{ padding: '30px', maxWidth: '800px', fontFamily: 'sans-serif', lineHeight: '1.6' }}>
            
            <button onClick={() => router.push('/')} style={{ marginBottom: '20px', padding: '5px 10px', cursor: 'pointer' }}>
                &larr; Back to Home
            </button>

            <h1 style={{ marginBottom: '20px' }}>AI Transparency & Your Financial Wellbeing</h1>

            {/* Our intial warning. */}
            <div style={{ backgroundColor: '#fff3cd', padding: '15px', borderLeft: '5px solid #ffc107', marginBottom: '30px' }}>
                <p style={{ margin: 0 }}>
                    <strong>Current Disclaimer:</strong> We use a powerful Machine Learning engine (XGBoost) to forecast your income. 
                    However, freelance and SME income is naturally unpredictable. This page shows the exact results of our AI 
                    stress-tests so you know exactly how much to trust the numbers. <strong>Always take predictions with a grain of salt and keep a safety buffer.</strong>
                </p>
            </div>

            {/* Introduction and our XGBoost explanation. */}
            <section style={{ marginBottom: '40px' }}>
                <p>On a typical month, our AI's prediction sits about 18.5% away from your actual final income. This is a robust score for forecasting chaotic freelance income, but it means you should always plan for a ~20% swing.</p>
                
                <p>To predict your income for the next immediate month, we use a Machine Learning Model commonly used in the industry called XGBoost. This model works by using decision trees. Imagine the root of the tree (the first income guess); this guess is made based on your past performance. Then with the second guess, the Machine Learning Algorithm only looks at the mistakes made during the first guess and tries to correct them. This process repeats thousands of times in a matter of seconds. Instead of trying to pull a prediction out of thin air, the algorithm systematically ‘boosts’ its own accuracy by fixing its own errors until it finds the most highly probable outcome for your business.</p>
                
                <p>At a higher level, there are usually two ways in which an AI can answer this question of predicted income:</p>
                <ul style={{ marginBottom: '15px' }}>
                    <li><strong>Classification:</strong> This is usually used for answering Yes or No questions.</li>
                    <li><strong>Regression:</strong> This is used for predicting an exact number on a continuous scale.</li>
                </ul>
                
                <p>We use regression, as a financial prediction cannot be answered with a simple ‘Yes’ or ‘No’. You don’t want to just know that you will get paid next month; you need to know exactly how much you will get paid so you can fund your lifestyle. This is why regression has been used.</p>
                
                <p><strong>What does this mean for you?</strong><br/>
                Our predictions are realistic, not optimistic. Our model will not give you a dangerously high prediction just to make you feel good; it is designed to be as precise as possible, so you can plan your financial life with confidence.</p>
            </section>

            {/* The 5 testing metrics used to evaluate the performance of our predictions. */}
            <section style={{ marginBottom: '25px' }}>
                <h3>1. Baseline Accuracy</h3>
                <p><strong>Average Error: 18.5%</strong></p>
                <p>During a typical month, our AI’s prediction is approximately 18.5% away from your actual final income for the month. We believe that this is a robust score for forecasting chaotic freelance income; however, you should always plan for a ~20% swing.</p>
            </section>

            <section style={{ marginBottom: '25px' }}>
                <h3>2. Error Distribution Test</h3>
                <p><strong>Median Error:</strong> 14.6%<br/>
                <strong>95th Percentile (Extreme Outliers):</strong> 47%</p>
                <p>Although our algorithm is usually very close to your final income (14.6% median error), our stress testing shows us that during the absolute worst 5% of months, the AI missed the actual income by 47% or more. Some months are too chaotic to predict, like real life. If a massive client cancels unexpectedly, the AI will not see it coming.</p>
            </section>

            <section style={{ marginBottom: '25px' }}>
                <h3>3. Over-Prediction Test</h3>
                <p><strong>Model Over-prediction: 52.1%</strong></p>
                <p>A ‘perfect’ AI model would over-predict 50% of the time and under-predict 50% of the time. Our model sits at 52.1%, meaning that it ever so slightly over-predicts income, leaning towards optimism, but remains safely anchored to the middle. As a result, this shows that our model will not give you dangerous false hope by chronically overestimating your future income, nor will it cause unnecessary panic and stress by always assuming the worst possible outcome.</p>
            </section>

            <section style={{ marginBottom: '25px' }}>
                <h3>4. Stress Test</h3>
                <p><strong>Average error during bottom 20% performing business months: 26.1%</strong></p>
                <p>During a business’s worst months, chaos increases. Our AI’s error rate increases by approximately 7.6% (18.5% to 26.1%), clearly demonstrating that our AI stays relatively stable and does not completely break down even when a business is struggling, helping you to plan your finances with ease.</p>
            </section>

            <section style={{ marginBottom: '40px' }}>
                <h3>5. Safety Bands Test</h3>
                <p><strong>Coverage Ratio: 65.1%</strong></p>
                <p>During testing, we set the ‘Worst Case’ (10th Percentile) and the ‘Best Case’ (90th Percentile) bands so that we could see how often the model predicts an income safely inside these bands. Currently, 65.1% of actual real-world incomes land in this range.</p>
            </section>

            {/* The financial conclusion box */}
            <div style={{ backgroundColor: '#fef2f2', padding: '20px', border: '1px solid #fca5a5', borderRadius: '8px', marginBottom: '40px' }}>
                <h3 style={{ marginTop: 0, color: '#991b1b' }}>Protecting Your Financial Wellbeing</h3>
                <p style={{ color: '#991b1b' }}>
                    Our XGBoost solution is designed to give you the clearest possible picture of your future income. However, it is not a crystal ball. If you were to treat these AI predictions as guaranteed income and cash in the bank, your finances would be at risk.
                </p>
                <p style={{ color: '#991b1b', marginBottom: 0 }}>
                    As our testing demonstrates above, freelancer and SME income can be subject to unpredictability. Since our safety bands currently capture 65.1% of real-world incomes, this means roughly that 1 in 3 months will fall completely outside of our forecasted range. Moreover, during a severe financial crisis, your actual income could drop nearly 50% lower than what the AI expected. <strong>Always maintain a physical cash buffer to protect yourself against months that no machine model can see coming, such as COVID-19.</strong>
                </p>
            </div>

            <hr style={{ margin: '30px 0', borderColor: '#eaeaea' }} />
            <p style={{ fontSize: '12px', color: 'gray', textAlign: 'center' }}>
                Machine Learning models are tested via historical stress testing scenarios.
            </p>

        </div>
    );
}