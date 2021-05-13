/// <reference types="node" />
/**
 * Stores text of an individual token, along with its timing information
 */
export interface TokenMetadata {
    /** The text corresponding to this token */
    text: string;
    /** Position of the token in units of 20ms */
    timestep: number;
    /** Position of the token in seconds */
    start_time: number;
}
/**
 * A single transcript computed by the model, including a confidence value and
 * the metadata for its constituent tokens.
 */
export interface CandidateTranscript {
    tokens: TokenMetadata[];
    /**
     * Approximated confidence value for this transcription. This is roughly the
     * sum of the acoustic model logit values for each timestep/token that
     * contributed to the creation of this transcription.
     */
    confidence: number;
}
/**
 * An array of CandidateTranscript objects computed by the model.
 */
export interface Metadata {
    transcripts: CandidateTranscript[];
}
/**
 * Provides an interface to a DeepSpeech stream. The constructor cannot be called
 * directly, use :js:func:`Model.createStream`.
 */
declare class StreamImpl {
    /**
     * @param nativeStream SWIG wrapper for native StreamingState object.
     */
    constructor(nativeStream: object);
    /**
     * Feed audio samples to an ongoing streaming inference.
     *
     * @param aBuffer An array of 16-bit, mono raw audio samples at the
     *                 appropriate sample rate (matching what the model was trained on).
     */
    feedAudioContent(aBuffer: Buffer): void;
    /**
     * Compute the intermediate decoding of an ongoing streaming inference.
     *
     * @return The STT intermediate result.
     */
    intermediateDecode(): string;
    /**
     * Compute the intermediate decoding of an ongoing streaming inference, return results including metadata.
     *
     * @param aNumResults Maximum number of candidate transcripts to return. Returned list might be smaller than this. Default value is 1 if not specified.
     *
     * @return :js:func:`Metadata` object containing multiple candidate transcripts. Each transcript has per-token metadata including timing information. The user is responsible for freeing Metadata by calling :js:func:`FreeMetadata`. Returns undefined on error.
     */
    intermediateDecodeWithMetadata(aNumResults?: number): Metadata;
    /**
     * Compute the final decoding of an ongoing streaming inference and return the result. Signals the end of an ongoing streaming inference.
     *
     * @return The STT result.
     *
     * This method will free the stream, it must not be used after this method is called.
     */
    finishStream(): string;
    /**
     * Compute the final decoding of an ongoing streaming inference and return the results including metadata. Signals the end of an ongoing streaming inference.
     *
     * @param aNumResults Maximum number of candidate transcripts to return. Returned list might be smaller than this. Default value is 1 if not specified.
     *
     * @return Outputs a :js:func:`Metadata` struct of individual letters along with their timing information. The user is responsible for freeing Metadata by calling :js:func:`FreeMetadata`.
     *
     * This method will free the stream, it must not be used after this method is called.
     */
    finishStreamWithMetadata(aNumResults?: number): Metadata;
}
/**
 * Exposes the type of Stream without actually exposing the class.
 * Because the Stream class should not be instantiated directly,
 * but instead be created via :js:func:`Model.createStream`.
 */
export declare type Stream = StreamImpl;
/**
 * An object providing an interface to a trained DeepSpeech model.
 */
export declare class Model {
    /**
     * @param aModelPath The path to the frozen model graph.
     *
     * @throws on error
     */
    constructor(aModelPath: string);
    /**
     * Get beam width value used by the model. If :js:func:`Model.setBeamWidth` was
     * not called before, will return the default value loaded from the model file.
     *
     * @return Beam width value used by the model.
     */
    beamWidth(): number;
    /**
     * Set beam width value used by the model.
     *
     * @param aBeamWidth The beam width used by the model. A larger beam width value generates better results at the cost of decoding time.
     *
     * @throws on error
     */
    setBeamWidth(aBeamWidth: number): void;
    /**
     * Add a hot-word and its boost
     *
     * @param aWord word
     * @param aBoost boost
     *
     * @throws on error
     */
    addHotWord(aWord: string, aBoost: number): void;
    /**
     * Erase entry for hot-word
     *
     * @param aWord word
     *
     * @throws on error
     */
    eraseHotWord(aWord: string): void;
    /**
     * Clear all hot-word entries
     *
     * @throws on error
     */
    clearHotWords(): void;
    /**
     * Return the sample rate expected by the model.
     *
     * @return Sample rate.
     */
    sampleRate(): number;
    /**
     * Enable decoding using an external scorer.
     *
     * @param aScorerPath The path to the external scorer file.
     *
     * @throws on error
     */
    enableExternalScorer(aScorerPath: string): void;
    /**
     * Disable decoding using an external scorer.
     *
     * @throws on error
     */
    disableExternalScorer(): void;
    /**
     * Set hyperparameters alpha and beta of the external scorer.
     *
     * @param aLMAlpha The alpha hyperparameter of the CTC decoder. Language Model weight.
     * @param aLMBeta The beta hyperparameter of the CTC decoder. Word insertion weight.
     *
     * @throws on error
     */
    setScorerAlphaBeta(aLMAlpha: number, aLMBeta: number): void;
    /**
     * Use the DeepSpeech model to perform Speech-To-Text.
     *
     * @param aBuffer A 16-bit, mono raw audio signal at the appropriate sample rate (matching what the model was trained on).
     *
     * @return The STT result. Returns undefined on error.
     */
    stt(aBuffer: Buffer): string;
    /**
     * Use the DeepSpeech model to perform Speech-To-Text and output metadata
     * about the results.
     *
     * @param aBuffer A 16-bit, mono raw audio signal at the appropriate sample rate (matching what the model was trained on).
     * @param aNumResults Maximum number of candidate transcripts to return. Returned list might be smaller than this.
     * Default value is 1 if not specified.
     *
     * @return :js:func:`Metadata` object containing multiple candidate transcripts. Each transcript has per-token metadata including timing information.
     * The user is responsible for freeing Metadata by calling :js:func:`FreeMetadata`. Returns undefined on error.
     */
    sttWithMetadata(aBuffer: Buffer, aNumResults?: number): Metadata;
    /**
     * Create a new streaming inference state. One can then call :js:func:`StreamImpl.feedAudioContent` and :js:func:`StreamImpl.finishStream` on the returned stream object.
     *
     * @return a :js:func:`StreamImpl` object that represents the streaming state.
     *
     * @throws on error
     */
    createStream(): StreamImpl;
}
/**
 * Frees associated resources and destroys model object.
 *
 * @param model A model pointer returned by :js:func:`Model`
 *
 */
export declare function FreeModel(model: Model): void;
/**
 * Free memory allocated for metadata information.
 *
 * @param metadata Object containing metadata as returned by :js:func:`Model.sttWithMetadata` or :js:func:`StreamImpl.finishStreamWithMetadata`
 */
export declare function FreeMetadata(metadata: Metadata): void;
/**
 * Destroy a streaming state without decoding the computed logits. This
 * can be used if you no longer need the result of an ongoing streaming
 * inference and don't want to perform a costly decode operation.
 *
 * @param stream A streaming state pointer returned by :js:func:`Model.createStream`.
 */
export declare function FreeStream(stream: StreamImpl): void;
/**
 * Returns the version of this library. The returned version is a semantic
 * version (SemVer 2.0.0).
 */
export declare function Version(): string;
export {};
